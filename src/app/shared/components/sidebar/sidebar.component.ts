import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { RouterNames } from '../../commons/enums';
import { SidebarMenuType } from '../../models/sidebar-menu.model';

@Component({
  selector: 'cost-tracker-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuList: SidebarMenuType[] = [
    {
      name: "Kimutatások", 
      routerLink: `${RouterNames.PROFILE}/${RouterNames.DASHBOARD}`
    },
    {
      name: "Kiadások", 
      routerLink: `${RouterNames.PROFILE}/${RouterNames.RECORDS}/${RouterNames.COST}`
    },
    {
      name: "Bevételek", 
      routerLink: `${RouterNames.PROFILE}/${RouterNames.RECORDS}/${RouterNames.INCOME}`
    },
    {
      name: "Beállítások", 
      routerLink: `${RouterNames.PROFILE}/${RouterNames.SETTINGS}`
    }
  ];

  width: number = 210;
  name: string = "";

  constructor(private router: Router, private alertService: AlertService, private elementRef: ElementRef) {
    this.name = localStorage.getItem("user") 
      ? `${JSON.parse(localStorage.getItem('user')!)['lastName']} ${JSON.parse(localStorage.getItem('user')!)['firstName']}`
      : '';
  }

  logout() {
    localStorage.removeItem("user");
    this.alertService.success("Sikeres kijelentkezés")
    this.router.navigate([RouterNames.EMPTY])
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = window.innerWidth <= 759 ? 0 : 210;
    let sidebar: HTMLElement = this.elementRef.nativeElement.querySelector("#sidebar");
    sidebar.classList.remove("w-100")
  }


  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.querySelector("#toggleSidebar")
      .addEventListener("click", () => {
        this.setupSidebarOnMobil();
        if (window.innerWidth > 759) {
          this.width = this.width == 210 ? 0 : 210;
        }
      });

    this.onResize();
  }

  setupSidebarOnMobil(): void {
    if (window.innerWidth <= 759) {
      let sidebar: HTMLElement = this.elementRef.nativeElement.querySelector("#sidebar");
      sidebar.classList.toggle("w-100")
    }
  }

}

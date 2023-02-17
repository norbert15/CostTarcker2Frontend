import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { RouterNames, sideBarMenus } from '../../commons/enums';
import { SidebarMenuType } from '../../models/sidebar-menu.model';

@Component({
  selector: 'cost-tracker-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  /**
   * Sidebar menu lista
   */
  menuList: SidebarMenuType[] = sideBarMenus;

  /**
   * Sidebar mérete
   */
  width: number = 210;

  /**
   * Felhasználó teljes neve
   */
  name: string = "";

  constructor(
    private router: Router, 
    private alertService: AlertService, 
    private elementRef: ElementRef
  ) {
    this.name = localStorage.getItem("user") 
      ? `${JSON.parse(localStorage.getItem('user')!)['lastName']} ${JSON.parse(localStorage.getItem('user')!)['firstName']}`
      : '';
  }

  /**
   * Kijelentkezés elínditása és local storage ürítése
   */
  logout() {
    localStorage.removeItem("user");
    this.alertService.success("Sikeres kijelentkezés")
    this.router.navigate([RouterNames.EMPTY])
  }

  /**
   * Módositja a sidebar méretének beállítása resize eseményre
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = window.innerWidth <= 759 ? 0 : 210;
    let sidebar: HTMLElement = this.elementRef.nativeElement.querySelector("#sidebar");
    sidebar.classList.remove("w-100")
  }

  /**
   * Sidebar beállítása mobil méretben
   */
  setUpSidebarOnMobil(): void {
    if (window.innerWidth <= 759) {
      let sidebar: HTMLElement = this.elementRef.nativeElement.querySelector("#sidebar");
      sidebar.classList.toggle("w-100")
    }
  }

  /**
   * Oninit
   */
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.querySelector("#toggleSidebar")
      .addEventListener("click", () => {
        this.setUpSidebarOnMobil();
        if (window.innerWidth > 759) {
          this.width = this.width == 210 ? 0 : 210;
        }
      });

    this.onResize();
  }
}

import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'cost-tracker-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private elementRef: ElementRef) {
  }

  rotate() {
    let button: HTMLButtonElement = this.elementRef.nativeElement.querySelector("#toggleSidebar");
    button.classList.toggle("rotate");
  }

}

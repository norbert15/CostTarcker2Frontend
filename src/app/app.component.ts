import { Component } from '@angular/core';

@Component({
  selector: 'cost-tracker',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isProfileSite(): boolean {
    return window.location.href.includes("profile");
  }
}
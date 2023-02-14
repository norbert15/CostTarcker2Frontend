import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cost-tracker-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.scss']
})
export class DashboardSettingsComponent implements OnInit {

  @Output()
  periodChangeEmit = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cost-tracker-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.scss']
})
export class DashboardSettingsComponent {

  /**
   * Időszak változásáról való visszajelzés a szülő komponensbe
   */
  @Output()
  periodChangeEmit = new EventEmitter<boolean>();

}

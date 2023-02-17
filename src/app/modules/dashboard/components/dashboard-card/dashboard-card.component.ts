import { Component, OnInit, Input } from '@angular/core';
import { DsMonthsService } from '../../services/ds-months.service';

@Component({
  selector: 'cost-tracker-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent {

  @Input() value!: number;

  @Input() sum!: number;

  @Input() iconClass!: string;

  @Input() color!: string;

  @Input() name!: string;
  
  constructor(public dsService: DsMonthsService) {}
}

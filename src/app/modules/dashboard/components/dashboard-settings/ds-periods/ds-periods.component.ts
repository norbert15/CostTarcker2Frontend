import { Component } from '@angular/core';
import { DsMonthsService } from '../../../services/ds-months.service';

@Component({
  selector: 'cost-tracker-ds-periods',
  templateUrl: './ds-periods.component.html',
  styleUrls: ['./ds-periods.component.scss']
})
export class DsPeriodsComponent {

  constructor(public dsService: DsMonthsService) { }

  /**
   * Éves kimutatások megjelenítésének be-kikapcsolása
   */
  setYearInOn(): void {
    this.dsService.isYearOn = !this.dsService.isYearOn;
  }

  /**
   * Havi kimutatások megjelenítésének be-kikapcsolása
   */
  setMonthInOn(): void {
    this.dsService.isMonthlyOn = !this.dsService.isMonthlyOn;
  }

}

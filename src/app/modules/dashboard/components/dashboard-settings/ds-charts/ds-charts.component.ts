import { Component, OnInit } from '@angular/core';
import { DsMonthsService } from '../../../services/ds-months.service';

@Component({
  selector: 'cost-tracker-ds-charts',
  templateUrl: './ds-charts.component.html',
  styleUrls: ['./ds-charts.component.scss']
})
export class DsChartsComponent {

  /**
   * Chart tipusai
   */
  chartTypes = [
    "Kiadás",
    "Bevétel"
  ];

  /**
   * Időszakok listája
   */
  periods = [
    "Havi",
    "Éves"
  ]

  constructor(public dsService: DsMonthsService) { }

  /**
   * Aktiv éves vagy havi chartok megjelenítésének beállítása tipustól függöen
   * 
   * @param {string} type chart tipusa
   * @param {string} period időszak 
   */
  setType(type: string, period: string) {
    let items = period == "Éves" ? this.dsService.activeYearlyCharts : this.dsService.activeMonthlyCharts
    let index = items.indexOf(type);
    if (index != -1)
      items.splice(index, 1);
    else 
      items.push(type);
  }
}

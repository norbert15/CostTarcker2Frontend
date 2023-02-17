import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { MONTH_NAMES } from 'src/app/shared/commons/enums';

@Injectable({
  providedIn: 'root'
})
export class DsMonthsService {

  /**
   * Kiválasztott hónapok diagrammok megjelenítéséhez
   */
  private activeMonths: string[] = MONTH_NAMES;

  /**
   * Éves kimutatások bekapcsolva
   */
  isYearOn: boolean = true;

  /**
   * Havi kimutatások bekapcsolva
   */
  isMonthlyOn: boolean = true;

  /**
   * Aktív kiválasztott év kimutatásokhoz
   */
  activeYear: number = parseInt(formatDate(Date(), "yyyy", "en"));

  /**
   * Aktiv havi chartok
   */
  activeMonthlyCharts: string[] = ["Bevétel", "Kiadás"];

  /**
   * Aktiv éves chartok
   */
  activeYearlyCharts: string[] = ["Bevétel", "Kiadás"];

  constructor() { }

  getActiveMonths(): string[] {
    return this.activeMonths;
  }

  setActiveMonths(monthList: string[]): void {
    this.activeMonths = monthList;
  }
}

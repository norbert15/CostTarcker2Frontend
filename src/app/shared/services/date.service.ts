import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { MONTH_NAMES } from '../commons/enums';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private activePeriod: string = formatDate(Date(), "Y-MM", "en") 

  constructor() { }

  getPeriod(): string {
    return this.activePeriod;
  }

  setPeriod(period: string): void {
    this.activePeriod = period;
  }

  getActiveYear(): number {
    return parseInt(formatDate(this.activePeriod, "y", "en"))
  }

  getActiveMontname(): string {
    return MONTH_NAMES[parseInt(formatDate(this.activePeriod, 'MM', 'en')) - 1]
  }
}

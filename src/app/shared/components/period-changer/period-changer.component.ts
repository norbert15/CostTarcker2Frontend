import { formatDate } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { DsMonthsService } from 'src/app/modules/dashboard/services/ds-months.service';
import { MAXIMUM_YEAR, MINIMUM_YEAR, MONTH_NAMES } from '../../commons/enums';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'cost-tracker-period-changer',
  templateUrl: './period-changer.component.html',
  styleUrls: ['./period-changer.component.scss']
})
export class PeriodChangerComponent implements OnInit {

  @Output()
  changePeriodEmit = new EventEmitter<boolean>();

  monthList: string[] = MONTH_NAMES;

  selectedMonthIndex!: number;
  selectedYear!: number;

  constructor(
    public dateService: DateService, 
    private elementRef: ElementRef, 
    public dsService: DsMonthsService) { 
    this.selectedMonthIndex = parseInt(formatDate(this.dateService.getPeriod(), "MM", "en")) - 1;
    this.selectedYear = dateService.getActiveYear();
  }

  ngOnInit(): void {
  }

  changePeriod(num: number): void {
    let date = this.changeMonth(num);
    this.dateService.setPeriod(formatDate(date, 'y-MM', 'en'));
    this.changePeriodEmit.emit(true);
  }

  isOutOf(num: number): boolean {
    let date = this.changeMonth(num);

    if (date.getFullYear() < MINIMUM_YEAR || MAXIMUM_YEAR < date.getFullYear()) {
      return true;
    }

    return false;
  }

  changeMonth(num: number): Date {
    let date = new Date(this.dateService.getPeriod());
    date.setMonth(date.getMonth() + num);
    return date;
  }

  setPeriodOnSave(): void {
    this.dateService.setPeriod(
      formatDate(
        `${this.selectedYear}-${this.selectedMonthIndex + 1}`, 
        'y-MM', 
        'en'
      )
    );
    this.changePeriodEmit.emit(true);
  }

  getPeriodChangerTitle(num: number): string {
    let index = parseInt(formatDate(this.dateService.getPeriod(), "MM", "en")) + num;

    if (index == 13) index = 1;
    if (index == 0) index = 12;

    return MONTH_NAMES[index - 1];
  }

  range() {
    let foo = [];
    for (let i = MINIMUM_YEAR; i <= MAXIMUM_YEAR; i++) {
        foo.push(i);
    }
    return foo;
  }

  scrollToActiveMonth() {
    this.selectedMonthIndex = parseInt(formatDate(this.dateService.getPeriod(), "MM", "en")) - 1;
    this.selectedYear = this.dateService.getActiveYear();

    setTimeout(() => {
      const FIXED: number = 96;

      let yearContainer: HTMLDivElement = this.elementRef.nativeElement.querySelector("#year-list");
      yearContainer.scrollTop = this.elementRef.nativeElement.querySelector("#year-" + this.selectedYear).offsetTop - FIXED;

      let monthContainer: HTMLDivElement = this.elementRef.nativeElement.querySelector("#month-list");
      monthContainer.scrollTop = this.elementRef.nativeElement.querySelector("#month-" + this.selectedMonthIndex).offsetTop - FIXED;
    }, 500);
  }
}

import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecordType, RecorsdWithCategoryType } from 'src/app/shared/models/record.model';
import { DateService } from 'src/app/shared/services/date.service';
import { CategoryService } from 'src/app/shared/services/http/category.service';
import { RecordService } from 'src/app/shared/services/http/record.service';
import { DsMonthsService } from './services/ds-months.service';

@Component({
  selector: 'cost-tracker-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  /**
   * Költségek listája
   */
  costRecordList: RecordType[] = [];

  /**
   * Bevételek listája
   */
  incomeRecordList: RecordType[] = [];

  /**
   * Mai dátum év/hó
   */
  today = formatDate(new Date(), "yyyy-MM", "en");

  /**
   * Éves költség
   */
  totalYearCost: number = 0;

  /**
   * Havi költség
   */
  currentMonthlyCost: number = 0;

  /**
   * Éves bevétel
   */
  totalYearIncomes: number = 0;

  /**
   * Havi bevétel
   */
  currentMonthlyIncomes: number = 0;

  /**
   * Havi költésegk listája kategóriánként csoportosítva
   */
  recordsWithCategories: RecorsdWithCategoryType[] = [];

  incomesWithCategories: RecorsdWithCategoryType[] = [];

  constructor(
    private recordService: RecordService, 
    private categorySerivce: CategoryService,
    public dsService: DsMonthsService,
    private periodService: DateService,
    private changeDec: ChangeDetectorRef) {
  }

  getRecordsWithCategories(): void {
    /* Havi költségek */
    this.recordService.getByPeriodAndType(this.today, 1).subscribe(
      res => {
        this.recordsWithCategories = res.data;
        this.currentMonthlyCost = this.recordsWithCategories.reduce((sum, current) => sum + current.sum, 0);
        this.changeDec.detectChanges();
      }
    )

    /* Havi bevétel */
    this.recordService.getByPeriodAndType(this.today, 2).subscribe(
      res => {
        this.incomesWithCategories = res.data;
        this.currentMonthlyIncomes = this.incomesWithCategories.reduce((sum, current) => sum + current.sum, 0);
        this.changeDec.detectChanges();
      }
    )
  }

  /**
   * Kiválasztott év hónapainak összegzet értékeinek lekérdezése
   */
  getActiveYearRecords(): void {
    /* Költések lekérdezése */
    this.recordService.getByYearAndType(this.dsService.activeYear, 1).subscribe(
      res => {
        this.costRecordList = res.data;
        this.totalYearCost = this.costRecordList.reduce((sum, current) => sum + current.value, 0);
        this.changeDec.detectChanges();
      }
    )

    /* Bevételek lekérdezése*/
    this.recordService.getByYearAndType(this.dsService.activeYear, 2).subscribe(
      res => {
        this.incomeRecordList = res.data;
        this.totalYearIncomes = this.incomeRecordList.reduce((sum, current) => sum + current.value, 0);
        this.changeDec.detectChanges();
      }
    )
  }

  isActiveAllMonthly(): boolean {
    return this.dsService.activeMonthlyCharts.length == 2;
  }

  isActiveAllYearly(): boolean {
    return this.dsService.activeYearlyCharts.length == 2;
  }

  ngOnInit(): void {
    this.getActiveYearRecords();
    this.getRecordsWithCategories();
  }
}

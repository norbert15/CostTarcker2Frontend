import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecordType, RecorsdWithCategoryType } from 'src/app/shared/models/record.model';
import { RecordService } from 'src/app/shared/services/http/record.service';
import { DashboardCardType } from './models/dashboard-card.model';
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
   * Havi költésegk listája kategóriánként csoportosítva
   */
  costWithCategories: RecorsdWithCategoryType[] = [];

  /**
   * Havi bevételek listája kategóriánként csoportosítva
   */
  incomesWithCategories: RecorsdWithCategoryType[] = [];

  /**
   * Card-ok listája
   */
  cardList: DashboardCardType[] = [
    {
      type: 1,
      name: "Éves kiadás",
      value: 0,
      isActive: this.dsService.isYearOn,
    },
    {
      type: 2,
      name: "Éves bevétel",
      value: 0,
      isActive: this.dsService.isYearOn,
    },
    {
      type: 1,
      name: "Havi kiadás",
      value: 0,
      isActive: this.dsService.isMonthlyOn,
    },
    {
      type: 2,
      name: "Havi bevétel",
      value: 0,
      isActive: this.dsService.isMonthlyOn,
    }
  ];;

  constructor(
    private recordService: RecordService, 
    public dsService: DsMonthsService,
    private changeDec: ChangeDetectorRef
  ) {}

  /**
   * Költségek és bevételek lekérdezése
   */
  getRecordstWithCategories(): void {
    /* Havi költségek */
    this.recordService.getByPeriodAndType(this.today, 1).subscribe(
      res => {
        this.costWithCategories = res.data;
        this.cardList[2].value = this.costWithCategories.reduce((sum, current) => sum + current.sum, 0);
        this.changeDec.detectChanges();
      }
    )

    /* Havi bevétel */
    this.recordService.getByPeriodAndType(this.today, 2).subscribe(
      res => {
        this.incomesWithCategories = res.data;
        this.cardList[3].value = this.incomesWithCategories.reduce((sum, current) => sum + current.sum, 0);
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
        this.cardList[0].value = this.costRecordList.reduce((sum, current) => sum + current.value, 0);
        this.changeDec.detectChanges();
      }
    )

    /* Bevételek lekérdezése*/
    this.recordService.getByYearAndType(this.dsService.activeYear, 2).subscribe(
      res => {
        this.incomeRecordList = res.data;
        this.cardList[1].value = this.incomeRecordList.reduce((sum, current) => sum + current.value, 0);
        this.changeDec.detectChanges();
      }
    )
  }

  /**
   * OnInit
   */
  ngOnInit(): void {
    this.getActiveYearRecords();
    this.getRecordstWithCategories();
  }
}

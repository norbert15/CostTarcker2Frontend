import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecorsdWithCategoryType } from 'src/app/shared/models/record.model';
import { DateService } from 'src/app/shared/services/date.service';
import { CategoryService } from 'src/app/shared/services/http/category.service';
import { RecordService } from 'src/app/shared/services/http/record.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordComponent implements OnInit {

  /**
   * Rekordok kategóriáként csoportositva
   */
  recordsWithCategories: RecorsdWithCategoryType[] = [];

  sum: number = 0;

  constructor(public recordService: RecordService,
              private changeDec: ChangeDetectorRef,
              private dateService: DateService) {
  }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(): void {
    this.recordService.getByPeriodAndType(this.dateService.getPeriod(), window.location.pathname.includes("cost") ? 1 : 2).subscribe(
      res => {
        this.recordsWithCategories = res.data;
        this.sum = res.data.reduce((sum, r) => sum + r.sum, 0);
        this.changeDec.detectChanges();
      }
    )
  }
}

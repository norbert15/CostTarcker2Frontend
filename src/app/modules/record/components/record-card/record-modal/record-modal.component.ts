import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { RecordType } from 'src/app/shared/models/record.model';
import { BaseResponseType } from 'src/app/shared/models/response.model';
import { DateService } from 'src/app/shared/services/date.service';
import { RecordService } from 'src/app/shared/services/http/record.service';

@Component({
  selector: 'cost-tracker-record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.scss']
})
export class RecordModalComponent {

  /**
   * Szülö komponensbe való visszaküldés rekord rögzítése során!
   */
  @Output()
  saveEmit = new EventEmitter<boolean>();

  /**
   * Kategória azonosítója
   */
  @Input()
  categoryId!: number;

  /**
   * Modal címe
   */
  @Input()
  title!: string;

  /**
   * Modal színe
   */
  @Input()
  color!: string;

  /**
   * Modal ikonja
   */
  @Input()
  icon!: string;

  /**
   * Rekordhoz tatozó komment
   */
  comment: string = "";

  /**
   * Rekord értéke
   */
  value: number = 0;

  constructor(
    private recordService: RecordService, 
    private alertService: AlertService, 
    private dateService: DateService
  ) { }

  /**
   * Rekord mentése
   */
  saveRecord(): void {
    if (this.value != 0) {
      this.alertService.info("Rekord rögzítése folyamatban...")

      const record: RecordType = {
        categoryId: this.categoryId,
        comment: this.comment,
        month: this.dateService.getPeriod(),
        value: this.value
      };

      this.recordService.post(record).subscribe(
        (response: BaseResponseType<RecordType>) => {
          this.alertService.success("Sikeres rögzítés")
          this.clear();
          this.saveEmit.emit(true);
        },
        err => {
          if (err.status == 500) {
            this.alertService.danger("Hiba történt a rekord rügzítése során")
          }

          if (err.status == 400) {
            this.alertService.danger("Hibásan megadott rekord!")
          }
          
          this.clear();
        }
      )
    }
  }

  /**
   * Rekord adatok nullázása
   */
  clear(): void {
    this.value = 0;
    this.comment = "";
  }
}

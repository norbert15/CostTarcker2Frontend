import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { RecordType } from 'src/app/shared/models/record.model';
import { DateService } from 'src/app/shared/services/date.service';
import { RecordService } from 'src/app/shared/services/http/record.service';

@Component({
  selector: 'cost-tracker-record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.scss']
})
export class RecordModalComponent {

  @Output()
  saveEmit = new EventEmitter<boolean>();

  @Input()
  id!: number;

  @Input()
  title!: string;

  @Input()
  color!: string;

  @Input()
  icon!: string;

  comment: string = "";

  value: number = 0;

  isValidValue(): boolean {
    return this.value <= -1000000001
      ? false 
      : this.value == 0 
        ? false
        : this.value >= 1000000001
          ? false
          : true
  }

  setUp(event: any) {
    event.target.value = this.value < -1000000000 
      ? -1000000000 
      : this.value > 1000000000
        ? 1000000000
        : event.target.value
    
    this.value = event.target.value;
  }

  constructor(private recordService: RecordService, private alertService: AlertService, private dateService: DateService) { }

  saveRecord(): void {
    if (this.value != 0) {
      this.alertService.info("Rekord rögzítése folyamatban...")
      let record: RecordType = {
        categoryId: this.id,
        comment: this.comment,
        month: this.dateService.getPeriod(),
        value: this.value
      };

      this.recordService.post(record).subscribe(
        response => {
          this.alertService.success("Sikeres rögzítés")
          this.clear();
          this.saveEmit.emit(true);
        },
        error => {
          this.alertService.danger("Hiba történt a rekord rügzítése során")
          this.clear();
        }
      )
    }
  }

  clear(): void {
    this.value = 0;
    this.comment = "";
  }
}

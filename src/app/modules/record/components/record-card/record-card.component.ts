import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryType } from 'src/app/shared/models/category.model';
import { RecordType } from 'src/app/shared/models/record.model';

@Component({
  selector: 'cost-tracker-record-card',
  templateUrl: './record-card.component.html',
  styleUrls: ['./record-card.component.scss']
})
export class RecordCardComponent {

  @Output()
  saveEmit = new EventEmitter<boolean>();

  @Input()
  isDefault!: boolean;

  @Input()
  value!: number;

  @Input()
  records: RecordType[] = [];

  @Input()
  sumValue!: number;

  @Input()
  category!: CategoryType

  isShow: boolean = false;

  constructor() { }

  calculateWidth() {
    if (this.value == 0 || this.sumValue == 0) {
      return "0%"
    }

    return `${(this.value / this.sumValue) * 100}%`
  }

  getPercantage(): string {
    return Math.round(+this.calculateWidth().replace("%", "")) + "%";
  }
}

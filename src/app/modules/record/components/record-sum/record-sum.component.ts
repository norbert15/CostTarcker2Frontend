import { Component, Input } from '@angular/core';

@Component({
  selector: 'cost-tracker-record-sum',
  templateUrl: './record-sum.component.html',
  styleUrls: ['./record-sum.component.scss']
})
export class RecordSumComponent {

  /**
   * Rekordok összege
   */
  @Input()
  sum!: number;
}

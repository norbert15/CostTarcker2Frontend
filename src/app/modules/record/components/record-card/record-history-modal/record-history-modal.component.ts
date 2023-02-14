import { Component, Input, OnInit } from '@angular/core';
import { CategoryType } from 'src/app/shared/models/category.model';
import { RecordType } from 'src/app/shared/models/record.model';

@Component({
  selector: 'cost-tracker-record-history-modal',
  templateUrl: './record-history-modal.component.html',
  styleUrls: ['./record-history-modal.component.scss']
})
export class RecordHistoryModalComponent implements OnInit {

  @Input()
  category!: CategoryType

  @Input()
  records: RecordType[] = [];

  constructor() { 
  }

  ngOnInit(): void {
  }

}

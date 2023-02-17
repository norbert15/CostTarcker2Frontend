import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryType } from 'src/app/shared/models/category.model';
import { RecordType } from 'src/app/shared/models/record.model';

@Component({
  selector: 'cost-tracker-record-card',
  templateUrl: './record-card.component.html',
  styleUrls: ['./record-card.component.scss']
})
export class RecordCardComponent {

  /**
   * Szülö komponensbe való visszaküldés rekord rögzítése során!
   */
  @Output()
  saveEmit = new EventEmitter<boolean>();

  /**
   * Kategóriához tartozó rekordok értéke
   */
  @Input()
  value!: number;

  /**
   * Rekordokat tartalmazó lista
   */
  @Input()
  records: RecordType[] = [];

  /**
   * Összes rekord összérték
   */
  @Input()
  sumValue!: number;

  /**
   * Kategória adatai, mely tartalmazza a hozzá tartozó színt, névt, ikont
   */
  @Input()
  category!: CategoryType
 
}

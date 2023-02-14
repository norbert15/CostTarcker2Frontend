import { Component, EventEmitter, Output } from '@angular/core';
import { MAXIMUM_YEAR, MINIMUM_YEAR, MONTH_NAMES } from 'src/app/shared/commons/enums';
import { DsMonthsService } from '../../../services/ds-months.service';

@Component({
  selector: 'cost-tracker-ds-month-modal',
  templateUrl: './ds-month-modal.component.html',
  styleUrls: ['./ds-month-modal.component.scss']
})
export class DsMonthModalComponent {

  /**
   * Az összes hóna neve egy listában
   */
  monthsList: string[] = MONTH_NAMES;

  /**
   * Aktív hónapok listája, melyek a beállítás előtt kerülnek mentésre.
   * Mentéskor ez a lista irja felül a DsMonthsService-ben lévő listát
   */
  settedMonthList: string[] = [];

  /**
   * Kiválasztott év
   */
  selectedYear!: number;

  /**
   * Időszak változáskor való visszajelzés
   */
  @Output()
  periodChangeEmit = new EventEmitter<boolean>();

  constructor(public dsMonthService: DsMonthsService) { 
    this.selectedYear = dsMonthService.activeYear;
    this.reset()
  }

  /**
   * Ellenörzi, hogy a paraméterben megadott hónapnév szerepel-e már a
   * settedMonthList listában. 
   * 
   * @param {string} month hónap neve 
   * @returns {boolean} true ha már benne van, ellenben false
   */
  isInActive(month: string): boolean {
    return this.settedMonthList.includes(month);
  }

  /**
   * Paraméterben megadott hónapnév alapján ellenörzi hogy szerepel-e már a 
   * settedMonthList listában
   * ha igen eltávolitja belőle
   * ha nem hozzáadja
   * 
   * @param {string} month hónap név 
   */
  setMonthList(month: string): void {
    this.isInActive(month) ? 
      this.settedMonthList.splice(this.settedMonthList.indexOf(month), 1) :
      this.settedMonthList.push(month);
  }

  /**
   * Beállítitott hónap lista (settedMonthList) mentése
   */
  setOnSave(): void {
    this.dsMonthService.setActiveMonths([...this.settedMonthList]);
    this.dsMonthService.activeYear = this.selectedYear;
    this.periodChangeEmit.emit(true);
  }

  /**
   * Beállított hónapok visszaállítása
   */
  reset(): void {
    this.settedMonthList = this.dsMonthService.getActiveMonths().map(x => x);
  }

  /**
   * Évek meghatázorása
   */
  range() {
    let foo = [];
    for (let i = MINIMUM_YEAR; i <= MAXIMUM_YEAR; i++) {
        foo.push(i);
    }
    return foo;
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { DsMonthsService } from '../../services/ds-months.service';

@Component({
  selector: 'cost-tracker-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent {

  @Input() set totalCost(sum: number) {
    this.cardList[0].value = sum;
  }

  @Input() set totalIncomes(sum: number) {
    this.cardList[1].value = sum;
  }

  @Input() set costName(name: string) {
    this.cardList[0].name = name;
  }

  @Input() set incomeName(name: string) {
    this.cardList[1].name = name;
  }

  cardList = [
    {
      iconClass: "fas fa-coins",
      color: "rgb(252, 3, 36)",
      name: "",
      value: 0,
      type: 1
    },
    
    {
      iconClass: "fas fa-credit-card",
      color: "rgb(42, 150, 222)",
      name: "",
      value: 0,
      type: 2,
    }
  ]

  constructor(public dsService: DsMonthsService) {}

  calculateWidth(type: number): string {
    if (this.cardList[0].value == 0 || this.cardList[1].value == 0) {
      return "0%"
    }

    return type === 1 
      ? `${(this.cardList[0].value / this.cardList[1].value) * 100}%`
      : `${((this.cardList[1].value - this.cardList[0].value) / this.cardList[1].value) * 100}%`
  }

  haveIt(type: number): string {
    return type === 1
      ? `${this.cardList[0].value.toLocaleString()} / ${this.cardList[1].value.toLocaleString()}`
      : `Megmaradt bevétel: ${(this.cardList[1].value - this.cardList[0].value).toLocaleString()}`
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicChartComponent } from './components/basic-chart/basic-chart.component';



@NgModule({
  declarations: [
    BasicChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BasicChartComponent
  ]
})
export class SharedModule { }

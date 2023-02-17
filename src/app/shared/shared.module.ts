import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicChartComponent } from './components/basic-chart/basic-chart.component';
import { BarWidthDirective } from './directives/bar-width.directive';



@NgModule({
  declarations: [
    BasicChartComponent,
    BarWidthDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BasicChartComponent,
    BarWidthDirective
  ]
})
export class SharedModule { }

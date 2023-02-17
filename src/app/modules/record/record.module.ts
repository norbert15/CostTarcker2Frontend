import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordRoutingModule } from './record-routing.module';
import { PeriodChangerComponent } from 'src/app/shared/components/period-changer/period-changer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontawsomeIconpickerComponent } from 'src/app/shared/components/fontawsome-iconpicker/fontawsome-iconpicker.component';
import { RecordComponent } from './record.component';
import { RecordCardComponent } from './components/record-card/record-card.component';
import { RecordModalComponent } from './components/record-card/record-modal/record-modal.component';
import { DeleteCategoryModalComponent } from './components/delete-category-modal/delete-category-modal.component';
import { CategoryModalComponent } from './components/category-modal/category-modal.component';
import { RecordHistoryModalComponent } from './components/record-card/record-history-modal/record-history-modal.component';
import { RecordPipechartComponent } from './components/record-pipechart/record-pipechart.component';
import { RecordSumComponent } from './components/record-sum/record-sum.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { OnHoverDirective } from './directives/on-hover.directive';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RecordCardComponent,
    RecordModalComponent,
    PeriodChangerComponent,
    FontawsomeIconpickerComponent,
    RecordComponent,
    DeleteCategoryModalComponent,
    CategoryModalComponent,
    RecordHistoryModalComponent,
    RecordPipechartComponent,
    RecordSumComponent,
    OnHoverDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecordRoutingModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ]
})
export class RecordModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardSettingsComponent } from './components/dashboard-settings/dashboard-settings.component';
import { DsMonthModalComponent } from './components/dashboard-settings/ds-month-modal/ds-month-modal.component';
import { DsPeriodsComponent } from './components/dashboard-settings/ds-periods/ds-periods.component';
import { DsChartsComponent } from './components/dashboard-settings/ds-charts/ds-charts.component';
import { FormsModule } from '@angular/forms';
import { DashboardChartsComponent } from './components/dashboard-charts/dashboard-charts.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardSettingsComponent,
    DsMonthModalComponent,
    DsPeriodsComponent,
    DsChartsComponent,
    DashboardChartsComponent,
    DashboardCardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ]
})
export class DashboardModule { }

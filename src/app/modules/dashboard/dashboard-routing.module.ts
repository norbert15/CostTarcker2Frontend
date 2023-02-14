import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterNames } from 'src/app/shared/commons/enums';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: RouterNames.EMPTY,
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

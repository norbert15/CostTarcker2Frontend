import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterNames } from 'src/app/shared/commons/enums';
import { RecordComponent } from './record.component';

const routes: Routes = [
  {
    path: RouterNames.INCOME,
    component: RecordComponent
  },
  {
    path: RouterNames.COST,
    component: RecordComponent
  },
  {
    path: "**",
    redirectTo: RouterNames.COST,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordRoutingModule { }

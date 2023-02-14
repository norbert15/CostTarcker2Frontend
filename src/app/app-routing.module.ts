import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterNames } from './shared/commons/enums';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: RouterNames.EMPTY,
    loadChildren: () => import("./modules/auth/auth.module")
      .then(module => module.AuthModule)
  },
  {
    path: RouterNames.LOGIN,
    loadChildren: () => import("./modules/auth/auth.module")
      .then(module => module.AuthModule)
  },
  {
    path: RouterNames.REGISTRATION,
    loadChildren: () => import("./modules/registration/registration.module")
      .then(module => module.RegistrationModule)
  },
  {
    canActivate: [AuthGuardService],
    path: RouterNames.PROFILE,
    children: [
      {
        path: RouterNames.RECORDS,
        loadChildren: () => import("./modules/record/record.module")
          .then(module => module.RecordModule)
      },
      {
        path: RouterNames.DASHBOARD,
        loadChildren: () => import("./modules/dashboard/dashboard.module")
          .then(module => module.DashboardModule)
      },
      {
        path: RouterNames.SETTINGS,
        loadChildren: () => import("./modules/settings/settings.module")
          .then(module => module.SettingsModule)
      },
      {
        path: "**",
        redirectTo: RouterNames.DASHBOARD
      }
    ]
  },
  {
    path: "**",
    redirectTo: RouterNames.EMPTY
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

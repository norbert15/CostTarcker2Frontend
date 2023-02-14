import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SettingsComponent,
    UserDataComponent,
    PasswordFormComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }

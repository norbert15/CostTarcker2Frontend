import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'cost-tracker-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  formGroup!: FormGroup;

  isOldPasswordNotMatch: boolean = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService) { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.userService.updatePasswordData(this.formGroup.getRawValue()).subscribe(
        res => {
          this.alertService.success("A jelszó sikeresen módosítva!");
          this.isOldPasswordNotMatch = false; 
        },
        err => {
          const errorFields: string[] = err.error.errorFields;
          if (err.status == 500) this.alertService.danger("Hiba történt a jelszó módosítása során");
          else if (errorFields.includes("A régi jelszó nem egyezik meg a jelenlegi jelszóval!")) this.isOldPasswordNotMatch = true; 
        }
      )
    }
  }

  isMinLength(control: string): boolean {
    return this.formGroup.get(control)!.errors?.minlength;
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      confirmNewPassword: new FormControl(null, [Validators.required, Validators.minLength(5), this.samePasswordValidator.bind(this)]),
    })
  }

  samePasswordValidator(control: FormControl): { [s: string]: boolean} | null {
    return this.formGroup !== undefined && control.value === this.formGroup.get('newPassword')!.value 
      ? null 
      : { notSamePassword: true };
  }
}

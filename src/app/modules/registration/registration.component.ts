import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { EMAIL_REGEX } from 'src/app/shared/commons/enums';
import { UserService } from '../settings/services/user.service';

@Component({
  selector: 'cost-tracker-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  formGroup!: FormGroup;

  isChecked: boolean = false;

  isUsernameExists: boolean = false;

  isEmailExists: boolean = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, this.emailValidator.bind(this)]),
      username: new FormControl(null, [Validators.minLength(5)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(5), this.samePasswordValidator.bind(this)]),
    })
  }

  onSubmit(): void {
    if (this.formGroup.valid && this.isChecked) {
      this.userService.post(this.formGroup.getRawValue()).subscribe(
        res => {
          this.alertService.success("Sikeres regisztráció!");
          this.router.navigate(["/login"]);
        },
        err => {
          const errorFields: string[] = err.error?.errorFields;
          if (err.status == 500) this.alertService.danger("Hiba történt a regisztráció során!");
          if (err.status == 400 && errorFields.includes("A felhasználónév már foglalt!")) this.isUsernameExists = true;
          if (err.status == 400 && errorFields.includes("Az email cím már foglalt!")) this.isEmailExists = true;
        }
      )
    }
  }

  isMinLengthInvalid(formControlName: string): boolean {
    return this.formGroup.get(formControlName)!.errors?.minlength;
  }

  isTouched(formControlName: string): boolean {
    return this.formGroup.get(formControlName)!.touched;
  }

  isInvalid(formControlName: string): boolean {
    return this.formGroup.get(formControlName)!.invalid;
  }

  samePasswordValidator(control: FormControl): { [s: string]: boolean} | null {
    return this.formGroup !== undefined && control.value === this.formGroup.get('password')!.value 
      ? null 
      : { notSamePassword: true };
  }

  emailValidator(control: FormControl) {
    if (control.value && control.value.match(EMAIL_REGEX)) {
      return null;
    }

    return {
      inValidEmail: true
    };
  }
}

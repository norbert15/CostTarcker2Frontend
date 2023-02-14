import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { EMAIL_REGEX } from 'src/app/shared/commons/enums';
import { UserType } from 'src/app/shared/models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'cost-tracker-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  user!: UserType;

  formGroup!: FormGroup;

  isUsernameExists: boolean = false;

  isEmailExists: boolean = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService) { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.userService.updateProfileData(this.formGroup.getRawValue()).subscribe(
        res => {
          res.data["token"] = this.user.token;
          localStorage.setItem("user", JSON.stringify(res.data));          
          this.alertService.success("A felhasználói adatok szerkesztése sikeres volt!");
          this.isUsernameExists = false;
          this.isEmailExists = false;
        },
        err => {
          const errorFields: string[] = err.error.errorFields;
          if (err.status == 500) this.alertService.danger("Hiba törént a felhasználói adatok szerkesztése során!");
          //if (errorFields.includes("Az e-mail cím formátum helytelen!"))
          if (errorFields.includes("Az e-mail cím már foglalt!")) this.isEmailExists = true;
          if (errorFields.includes("A felhasználónév már foglalt!")) this.isUsernameExists = true;
        }
      )
    }
  }

  isInvalid(control: string): boolean {
    return this.formGroup.get(control)!.invalid;
  }

  ngOnInit(): void {
    this.initForm();
  }

  isEmailValid(control: FormControl) {
    if (control.value && control.value.match(EMAIL_REGEX)) {
      return null;
    }

    return {
      inValidEmail: true
    };
  }

  initForm(): void {
    this.user = JSON.parse(localStorage.getItem("user")!);
    this.formGroup = new FormGroup({
      id: new FormControl(this.user.id),
      email: new FormControl(this.user.email, [Validators.required, this.isEmailValid.bind(this)]),
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl(this.user.lastName, [Validators.required, Validators.minLength(3)]),
      firstName: new FormControl(this.user.firstName, [Validators.required, Validators.minLength(3)]),
    });
  }

}

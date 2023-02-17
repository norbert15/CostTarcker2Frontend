import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { EMAIL_REGEX } from 'src/app/shared/commons/enums';
import { BaseResponseType } from 'src/app/shared/models/response.model';
import { UserType } from 'src/app/shared/models/user.model';
import { FormValidatorService } from 'src/app/shared/services/form-validator.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'cost-tracker-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
  providers: [FormValidatorService]
})
export class UserDataComponent implements OnInit {

  /**
   * Felhasználó adatai
   */
  user!: UserType;

  /**
   * Form group
   */
  formGroup!: FormGroup;

  /**
   * A form-ban megadott felhasználónév foglalt-e
   * Submit után kerül módosításra abban az esetben ha már foglalt
   */
  isUsernameExists: boolean = false;

  /**
   * A form-ban megadott e-mail cím foglalt-e
   * Submit után kerül módosításra abban az esetben ha már foglalt
   */
  isEmailExists: boolean = false;

  constructor(
    public formValidatorService: FormValidatorService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  /**
   * Felhasználói adatok szerkesztésének elinditása.
   * 
   * Submit esemény kiváltásakor kerül meghívásra, mely során a form group-ban lévő adatok
   * megadása után továbbitja azokat a szerver felé ha azok megfelelnek a validálásoknak.
   */
  onSubmit(): void {
    if (this.formGroup.valid) {
      this.userService.updateProfileData(this.formGroup.getRawValue()).subscribe(
        (response: BaseResponseType<UserType>) => {
          response.data["token"] = this.user.token;
          localStorage.setItem("user", JSON.stringify(response.data));   

          this.isUsernameExists = false;
          this.isEmailExists = false;
          this.alertService.success("A felhasználói adatok szerkesztése sikeres volt!");
        },
        err => {
          const errorFields: string[] = err.error.errorFields;

          // Váratlan szerver hiba esetén
          if (err.status == 500) {
            this.alertService.danger("Hiba törént a felhasználói adatok szerkesztése során!");
          }

          // Validálási hibák esetén
          if (errorFields.includes("Az e-mail cím már foglalt!")) {
            this.isEmailExists = true;
          }

          if (errorFields.includes("A felhasználónév már foglalt!")) {
            this.isUsernameExists = true;
          }
        }
      )
    }
  }

  /**
   * Form group inicializálása
   */
  initForm(): void {
    this.user = JSON.parse(localStorage.getItem("user")!);
    this.formGroup = new FormGroup({
      id: new FormControl(this.user.id),
      email: new FormControl(this.user.email, [Validators.required, this.formValidatorService.emailValidator.bind(this)]),
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl(this.user.lastName, [Validators.required, Validators.minLength(3)]),
      firstName: new FormControl(this.user.firstName, [Validators.required, Validators.minLength(3)]),
    });

    this.formValidatorService.formGroup = this.formGroup;
  }

  /**
   * Oninit
   */
  ngOnInit(): void {
    this.initForm();
  }
}

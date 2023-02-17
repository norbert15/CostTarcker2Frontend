import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { EMAIL_REGEX } from 'src/app/shared/commons/enums';
import { BaseResponseType } from 'src/app/shared/models/response.model';
import { UserType } from 'src/app/shared/models/user.model';
import { FormValidatorService } from 'src/app/shared/services/form-validator.service';
import { UserService } from '../settings/services/user.service';

@Component({
  selector: 'cost-tracker-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [FormValidatorService]
})
export class RegistrationComponent implements OnInit {

  /**
   * Form group
   */
  formGroup!: FormGroup;

  /**
   * Adatvédelmi nyilatkozat státusza
   */
  isChecked: boolean = false;

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
    private alertService: AlertService,
    private userService: UserService,
    private router: Router
  ) { }

  /**
   * Felhasználó létrehozásának elinditása.
   * 
   * Submit esemény kiváltásakor kerül meghívásra, mely során a form group-ban lévő adatok
   * megadása után továbbitja azokat a szerver felé ha azok megfelelnek a validálásoknak.
   */
  onSubmit(): void {
    if (this.formGroup.valid && this.isChecked) {
      this.userService.post(this.formGroup.getRawValue()).subscribe(
        (response: BaseResponseType<UserType>) => {
          this.alertService.success("Sikeres regisztráció!");
          this.router.navigate(["/login"]);
        },
        err => {
          const errorFields: string[] = err.error?.errorFields;

          // Váratlan szerver hiba esetén
          if (err.status == 500) {
            this.alertService.danger("Hiba történt a regisztráció során!");
          }

          // Validálási hibák esetén
          if (errorFields.includes("A felhasználónév már foglalt!")) {
            this.isUsernameExists = true;
          }

          if (errorFields.includes("Az email cím már foglalt!")) {
            this.isEmailExists = true;
          }
        }
      )
    }
  }

  /**
   * Oninit, form group inicializálása
   */
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, this.formValidatorService.emailValidator.bind(this)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(5), this.formValidatorService.samePasswordValidator('password')]),
    })

    this.formValidatorService.formGroup = this.formGroup;
  }
}

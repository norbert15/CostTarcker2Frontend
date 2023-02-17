import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { BaseResponseType } from 'src/app/shared/models/response.model';
import { FormValidatorService } from 'src/app/shared/services/form-validator.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'cost-tracker-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  providers: [FormValidatorService]
})
export class PasswordFormComponent implements OnInit {

  /**
   * Form group
   */
  formGroup!: FormGroup;

  /**
   * A form-ban megadott régi jelszó egyezőség
   * Submit után kerül módosításra abban az esetben ha már foglalt
   */
  isOldPasswordNotMatch: boolean = false;

  constructor(
    public formValidatorService: FormValidatorService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  /**
   * Felhasználó jelszavának szerkesztésének elinditása.
   * 
   * Submit esemény kiváltásakor kerül meghívásra, mely során a form group-ban lévő adatok
   * megadása után továbbitja azokat a szerver felé ha azok megfelelnek a validálásoknak.
   */
  onSubmit(): void {
    if (this.formGroup.valid) {
      this.userService.updatePasswordData(this.formGroup.getRawValue()).subscribe(
        (response: BaseResponseType<string>) => {
          this.isOldPasswordNotMatch = false; 
          this.alertService.success("A jelszó sikeresen módosítva!");
        },
        err => {
          const errorFields: string[] = err.error.errorFields;
          
          // Váratlan szerver hiba esetén
          if (err.status == 500) {
            this.alertService.danger("Hiba történt a jelszó módosítása során");
          }

          // Validálási hibák esetén
          if (errorFields.includes("A régi jelszó nem egyezik meg a jelenlegi jelszóval!")) {
            this.isOldPasswordNotMatch = true; 
          }
        }
      )
    }
  }

  /**
   * Oninit, form inicializálása
   */
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      confirmNewPassword: new FormControl(null, [Validators.required, Validators.minLength(5), this.formValidatorService.samePasswordValidator("newPassword")]),
    })

    this.formValidatorService.formGroup = this.formGroup;
  }
}

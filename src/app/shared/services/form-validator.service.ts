import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { EMAIL_REGEX } from '../commons/enums';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  /**
   * Aktuális form group
   */
  formGroup!: FormGroup;

  constructor() { }

  /**
   * Paraméterben megadott form control name alapján visszaajda,
   * hogy a felhasználó elhagyta-e a form control-t.
   * 
   * @param {string} formControlName form group-ban lévő form control name
   * @returns {boolean} true ha a felhasználó kikattintott a form control-ból
   * azonban false
   */
  isTouched(formControlName: string): boolean {
    return this.formGroup.get(formControlName)!.touched;
  }

  /**
   * Paraméterben megadott form control name alapján visszaadja, 
   * hogy invalid-e az adott form group-ban lévő form control
   * 
   * @param {string} formControlName form group-ban lévő form control name
   * @returns {boolean} logikai érték, true ha a from control invalid, azonban false
   */
  isInvalid(formControlName: string): boolean {
    return this.formGroup.get(formControlName)!.invalid;
  }

  /**
   * Paraméterben megadott form control name alapján visszaadja, 
   * hogy nem rendelkezik-e a minimum karakterek számával
   * 
   * @param {string} formControlName 
   * @returns {boolean} true ha a karakterek száma kevesebb mint a minimum,
   * azonban false
   */
  isMinLengthInvalid(formControlName: string): boolean {
    return this.formGroup.get(formControlName)!.errors?.minlength;
  }

  /**
   * Paraméterben megadott form control name alapján visszaadja,
   * hogy a jelszó egyezőség nem megfeleő
   * 
   * @param formControlName from group-ban lévő form control name
   * @returns {boolean} true ha nem egyenlő a kétjelszó, azonban false
   */
  isNotSamePassword(formControlName: string): boolean {
    return this.formGroup.get(formControlName)!.errors?.notSamePassword;
  }

  /**
   * Paraméterben megadott form control name alapján visszaadja,
   * hogy az értéke invalid e-mail cím
   * 
   * @param formControlName form group-ban lévő from control name
   * @returns {boolean} true ha invalid e-mail cím, azonban false
   */
  isEmailInvalid(formControlName: string): boolean {
    return this.formGroup.get(formControlName)!.errors?.inValidEmail;
  }

  /**
   * Paraméterben megadott form control alapján beállitja a jelszó egyezőség validálását
   * 
   * @param {FormControl} passwordFormControlName az összehasonlitás alapja 
   * @returns {ValidatorFn} jelsző egyezőségért felelő Validátor
   */
  samePasswordValidator(passwordFormControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (this.formGroup !== undefined && control.value === this.formGroup.get(passwordFormControlName)!.value) {
        return null;
      }

      return { 
        notSamePassword: true 
      };
    }
  }

  /**
   * Paraméterben megadott form control alapján ellenörzi, hogy valid e-mail cím-e
   * 
   * @param {FormControl} control from group-ban lévő form control adatai/tulajdonságai
   * @returns {{[key: string]: boolean} | null} invalid esetén egy logikai értékü kulcs-érték pár kerül visszaadásra,
   * valid esetén null
   */
  emailValidator(control: FormControl): { [key: string]: boolean } | null {
    if (control.value && control.value.match(EMAIL_REGEX)) {
      return null;
    }

    return {
      inValidEmail: true
    };
  }
}

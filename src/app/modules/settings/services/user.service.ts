import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponseType } from 'src/app/shared/models/response.model';
import { UserType } from 'src/app/shared/models/user.model';
import { CrudService } from 'src/app/shared/services/http/crud.service';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environments/environment';
import { PasswordType } from '../models/password.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<UserType> {

  constructor(protected http: HttpClient) { 
    super(http, "users")
  }

  /**
   * Http PUT-os kérés küldése, mely során a felhasználói adatok szerkesztésre kerülnek
   * 
   * @param {UserType} profile felhasználói adatok 
   * @returns {Observable<BaseResponseType<UserType>>} 
   */
  updateProfileData(profile: UserType): Observable<BaseResponseType<UserType>> {
    return this.http.put(`${API_URL}/users/profile`, profile) as Observable<BaseResponseType<UserType>>;
  }

  /**
   * Http PUT-os kérés küldése, mely során a felhasználó jelszava szerkesztésre kerülnek
   * 
   * @param {PasswordType} password  
   * @returns {Observable<BaseResponseType<string>>}
   */
  updatePasswordData(password: PasswordType): Observable<BaseResponseType<string>> {
    return this.http.put(`${API_URL}/users/password`, password) as Observable<BaseResponseType<string>>;
  }
}

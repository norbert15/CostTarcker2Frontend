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

  updateProfileData(profile: UserType): Observable<BaseResponseType<UserType>> {
    return this.http.put(`${API_URL}/users/profile`, profile) as Observable<BaseResponseType<UserType>>;
  }

  updatePasswordData(password: PasswordType) {
    return this.http.put(`${API_URL}/users/password`, password);
  }
}

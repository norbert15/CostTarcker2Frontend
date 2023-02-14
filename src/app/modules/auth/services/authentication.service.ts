import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponseType } from 'src/app/shared/models/response.model';
import { UserType } from 'src/app/shared/models/user.model';
import { API_URL } from 'src/environments/environment';
import { AuthType } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(protected http: HttpClient) {
   }

  login(user: AuthType) {
    return this.http.post(API_URL + "/login", user);
  }

  getAuthenticatedUser(): Observable<any> {
    return this.http.get<any>(API_URL + "/users/active");
  }
}

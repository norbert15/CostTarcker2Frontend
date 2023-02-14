import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environments/environment';
import { BaseResponseType } from '../../models/response.model';

export abstract class CrudService<T> {

  url: string = API_URL;

  constructor(protected _http: HttpClient, protected path: string) {
    this.url += "/" + this.path; 
  }

  getAll(): Observable<BaseResponseType<T[]>> {
    return this._http.get(this.url) as Observable<BaseResponseType<T[]>>;
  }

  getById(id: any): Observable<BaseResponseType<T>> {
    return this._http.get(`${this.url}/${id}`) as Observable<BaseResponseType<T>>;
  }

  put(id: number, request: T): Observable<BaseResponseType<T>> {
    return this._http.put(`${this.url}/${id}`, request) as Observable<BaseResponseType<T>>;
  }

  post(request: T): Observable<BaseResponseType<T>> {
    return this._http.post(this.url, request) as Observable<BaseResponseType<T>>;
  }

  delete(id: number): Observable<BaseResponseType<T>> {
    return this._http.delete(`${this.url}/${id}`) as Observable<BaseResponseType<T>>
  }
}

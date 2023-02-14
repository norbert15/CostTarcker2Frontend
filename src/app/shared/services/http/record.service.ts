import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecordType, RecorsdWithCategoryType } from '../../models/record.model';
import { BaseResponseType } from '../../models/response.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService extends CrudService<RecordType> {

  private activeRecordIcon: string = "fas fa-cart-arrow-down";

  constructor(
    protected http: HttpClient) {
    super(http, "records")
  }

  /**
   * Aktív rekord ikon visszaadása
   * 
   * @returns 
   */
  getActiveRecordIcon(): string {
    return this.activeRecordIcon;
  }

  /**
   * Paraméterben megadott ikon alapján beállítja az aktuális ikont
   * 
   * @param {string} icon megadott ikon
   */
  setActiveRecordIcon(icon: string) {
    this.activeRecordIcon = icon;
  }

  /**
   * 
   * @param period 
   * @param type 
   * @returns 
   */
  getByPeriodAndType(period: string, type: number): Observable<BaseResponseType<RecorsdWithCategoryType[]>> {
    return this.http.get(`${this.url}/month/${period}?type=${type}`) as Observable<BaseResponseType<RecorsdWithCategoryType[]>>;
  }

  /**
   * 
   * @param year 
   * @param type 
   * @returns 
   */
  getByYearAndType(year: number, type: number): Observable<BaseResponseType<RecordType[]>> {
    return this.http.get(`${this.url}/year/${year}?type=${type}`) as Observable<BaseResponseType<RecordType[]>>;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryType } from '../../models/category.model';
import { BaseResponseType } from '../../models/response.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CrudService<CategoryType> {

  constructor(protected http: HttpClient) { 
    super(http, "categories")
  }
}

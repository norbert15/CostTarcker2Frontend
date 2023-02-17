import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { CategoryType } from 'src/app/shared/models/category.model';
import { BaseResponseType } from 'src/app/shared/models/response.model';
import { CategoryService } from 'src/app/shared/services/http/category.service';
import { RecordService } from 'src/app/shared/services/http/record.service';

@Component({
  selector: 'cost-tracker-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  /**
   * Eseményekről való visszajelzés a szülő komponensbe
   */
  @Output()
  eventEmit = new EventEmitter<boolean>();

  /**
   * Kategória adatai ha szerkesztésre kerül sor
   */
  @Input()
  category: CategoryType | undefined;

  /** 
   * Kategória form
   */
  categoryFormGroup!: FormGroup;

  /**
   * Kategória tipusa
   */
  categoryType: number = 1;

  constructor(
    private recordService: RecordService, 
    private categoryService: CategoryService, 
    private alertService: AlertService
  ) { }

  /**
   * Form inicializálása
   */
  initForm(): void {
    this.categoryFormGroup = new FormGroup(
      {
        name: new FormControl(this.category ? this.category.name : null, Validators.required),
        icon: new FormControl(this.category ? this.category.icon : this.recordService.getActiveRecordIcon(), Validators.required),
        color: new FormControl(this.category ? this.category.color : "#000000", Validators.required),
        type: new FormControl(this.category ? this.category.type : this.categoryType, Validators.required)
      }
    )
  }

  /**
   * Kategória tipusának visszaadása az url-ből
   * 
   * @returns {number} kategória tipusa
   */
  getCategoryTypeByUrl(): number {
    return window.location.pathname.includes("cost") ? 1 : 2;
  }

  /**
   * Kategória mentése onSubmit-ra
   */
  saveCategory(): void {
    this.categoryFormGroup.controls.icon.setValue(this.recordService.getActiveRecordIcon());
    if (this.categoryFormGroup.valid) {
      this.category ? this.editCategory() : this.addCategory();
    }
  }

  /**
   * Kategória létrehozásának elinditása a szerver felé
   */
  addCategory(): void {
    this.alertService.info("Új kategória létrehozása folyamatban...");
    this.categoryService.post(this.categoryFormGroup.getRawValue()).subscribe(
      (response: BaseResponseType<CategoryType>) => {
        this.alertService.success("Sikeres létrehozás");
        this.eventEmit.emit(true)
        this.initForm();
      },
      error => {
        this.alertService.danger("Hiba történt a létrehozás során!");
      }
    )
  }

  /**
   * Kategória szerkesztésének elinditása a szerver felé
   */
  editCategory(): void {
    this.alertService.info("Kategória szerkesztése folyamatban...");
    this.categoryService.put(this.category!.id, this.categoryFormGroup.getRawValue()).subscribe(
      (response: BaseResponseType<CategoryType>) => {
        this.alertService.success("Sikeres kategória szerkesztés");
        this.eventEmit.emit(true)
        this.category = undefined;
        this.initForm();
      },
      error => {
        this.alertService.danger("Hiba történt a kategória szerkesztése során!");
        this.category = undefined;
        this.initForm();
      }
    )
  }

  /**
   * OnInit, form inicializálása
   */
  ngOnInit(): void {
    this.categoryType = this.getCategoryTypeByUrl();
    this.initForm();
  }
}

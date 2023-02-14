import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { CategoryType } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/http/category.service';
import { RecordService } from 'src/app/shared/services/http/record.service';

@Component({
  selector: 'cost-tracker-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  @Output()
  createEmit = new EventEmitter<boolean>();

  categoryFormGroup!: FormGroup;

  @Input()
  category: CategoryType | undefined;

  constructor(private recordService: RecordService, private categoryService: CategoryService, private alertService: AlertService) { 
  }

  initForm(): void {
    this.categoryFormGroup = new FormGroup(
      {
        name: new FormControl(this.category ? this.category.name : null, Validators.required),
        icon: new FormControl(this.category ? this.category.icon : this.recordService.getActiveRecordIcon(), Validators.required),
        color: new FormControl(this.category ? this.category.color : "#000000", Validators.required),
        type: new FormControl(this.category ? this.category.type : this.getCategoryTypeByUrl(), Validators.required)
      }
    )
  }

  ngOnInit(): void {
    this.initForm();
  }

  getCategoryTypeByUrl(): number {
    return window.location.pathname.includes("cost") ? 1 : 2;
  }

  saveCategory(): void {
    this.categoryFormGroup.controls.icon.setValue(this.recordService.getActiveRecordIcon());
    if (this.categoryFormGroup.valid) {
      this.category ? this.editCategory() : this.addCategory();
    }
  }

  addCategory(): void {
    this.alertService.info("Új kategória létrehozása folyamatban...");
    this.categoryService.post(this.categoryFormGroup.getRawValue()).subscribe(
      response => {
        this.alertService.success("Sikeres létrehozás");
        this.createEmit.emit(true)
        this.initForm();
      },
      error => {
        this.alertService.danger("Hiba történt a létrehozás során!");
      }
    )
  }

  editCategory(): void {
    this.alertService.info("Kategória szerkesztése folyamatban...");
    this.categoryService.put(this.category!.id, this.categoryFormGroup.getRawValue()).subscribe(
      response => {
        this.alertService.success("Sikeres kategória szerkesztés");
        this.createEmit.emit(true)
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
}

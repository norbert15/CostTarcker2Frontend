import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { CategoryService } from 'src/app/shared/services/http/category.service';

@Component({
  selector: 'cost-tracker-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.scss']
})
export class DeleteCategoryModalComponent  {

  @Input()
  categoryId!: number;

  @Input()
  name!: string;

  @Output()
  deleteEventEmiter = new EventEmitter<boolean>();

  constructor(private categoryService: CategoryService, private alertService: AlertService) { }

  deleteCategory(): void {
    this.alertService.info("A kategória törlése folyamataban...")
    this.categoryService.delete(this.categoryId).subscribe(
      response => {
        this.alertService.success("Sikeres kategória törlés");
        this.deleteEventEmiter.emit(true);
      },
      error => {
        this.alertService.danger("Hiba történt a kategória törlése során!")
      }
    )
  }

}

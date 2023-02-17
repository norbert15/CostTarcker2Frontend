import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { CategoryService } from 'src/app/shared/services/http/category.service';

@Component({
  selector: 'cost-tracker-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.scss']
})
export class DeleteCategoryModalComponent  {

  /**
   * Kategória azonosítója
   */
  @Input()
  categoryId!: number;

  /**
   * Kategória neve
   */
  @Input()
  name!: string;

  /**
   * Törlés után való visszajelzés a szülőkomponensbe
   */
  @Output()
  deleteEventEmiter = new EventEmitter<boolean>();

  constructor(
    private categoryService: CategoryService, 
    private alertService: AlertService
  ) { }

  /**
   * Kategória eltávlításának elinidtása a szerver felé
   */
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

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { DialogService } from 'src/app/services/component/dialog.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { AddInventoryComponent } from './dialogs/add-inventory/add-inventory.component';
import { ConsumeIngredientComponent } from './dialogs/consume-ingredient/consume-ingredient.component';
import { RestockIngredientComponent } from './dialogs/restock-ingredient/restock-ingredient.component';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.page.html',
  styleUrls: ['./inventory-management.page.scss'],
})
export class InventoryManagementPage implements OnInit, AfterViewInit {

  ingredients: IngredientView[] = [];
  constructor(
    private ingredientSvc: IngredientService,
    private dlgSvc: DialogService
  ) { }

  ngAfterViewInit(): void {
    this.getIngredients();
  }

  ngOnInit() {
  }

  getIngredients() {
    const subscriber = this.ingredientSvc
      .findAll()
      .subscribe((data: Ingredient[]) => {
        this.ingredients = [];
        data.forEach(d=>{
          const ingredientView = d as IngredientView;
          ingredientView.totalQuantity = 0;
          ingredientView.quantityDetails.forEach(qtyDetail=>{
            ingredientView.totalQuantity += qtyDetail.qty;
          });
          this.ingredients.push(ingredientView);
        });
        subscriber.unsubscribe();
      });
  }

  addIngredient() {
    this.dlgSvc.presentModal(
      AddInventoryComponent,
      {},
      () => { this.getIngredients(); }
    );
  }

  restockIngredient(idx: number) {
    this.dlgSvc.presentModal(
      RestockIngredientComponent,
      { ingredient: this.ingredients[idx] },
      () => { this.getIngredients(); }
    );
  }

  consumeIngredient(idx: number) {
    this.dlgSvc.presentModal(
      ConsumeIngredientComponent,
      { ingredient: this.ingredients[idx] },
      () => { this.getIngredients(); }
    );
  }
}

interface IngredientView extends Ingredient {
  totalQuantity: number;
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentProps, ComponentRef } from '@ionic/core';
import { Ingredient } from 'src/app/interfaces/ingredient';
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

  ingredients: Ingredient[] = [];
  constructor(
    private ingredientSvc: IngredientService,
    private modalCtrller: ModalController
  ) { }

  ngAfterViewInit(): void {
    this.getIngredients();
  }

  ngOnInit() {
  }

  /**
   * 取得材料庫存
   */
  getIngredients() {
    this.ingredientSvc
      .getIngredients()
      .subscribe((data: Ingredient[]) => {
        this.ingredients = data;
      });
  }

  /**
   * 開啟對話窗
   * @param component 
   * @param componentProps 
   * @param success 
   */
  async presentModal(
    component: ComponentRef,
    componentProps: ComponentProps<ComponentRef>,
    success = () => { }) {
    const modal = await this.modalCtrller.create({
      component: component,
      componentProps: componentProps,
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      swipeToClose: true
    });
    await modal.present();
    modal.onWillDismiss().then((data) => {
      if (
        data.role === "backdrop"
        || data.role === "gesture"
        || data.role === "cancel"
      ) {

      } else {
        success();
      }
    });
  }

  /**
   * 新增材料
   */
  addIngredient() {
    this.presentModal(
      AddInventoryComponent,
      {},
      () => { this.getIngredients() }
    );
  }

  /**
   * 進貨
   */
  restockIngredient(idx: number) {
    this.presentModal(
      RestockIngredientComponent,
      { ingredient: this.ingredients[idx] },
      () => { this.getIngredients() }
    );
  }

  /**
   * 出貨
   */
  consumeIngredient(idx: number) {
    this.presentModal(
      ConsumeIngredientComponent,
      { ingredient: this.ingredients[idx] },
      () => { this.getIngredients() }
    );
  }
}

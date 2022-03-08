import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { IngredientSplitConfig } from 'src/app/interfaces/ingredient-split-config';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-consume-ingredient',
  templateUrl: './consume-ingredient.component.html',
  styleUrls: ['./consume-ingredient.component.scss'],
})
export class ConsumeIngredientComponent implements OnInit {

  @Input() ingredient: Ingredient;
  ingredientSplitConfig: IngredientSplitConfig = null;
  action: string = "expired";
  consume_qty: number = 1;

  constructor(
    private ingredientSvc: IngredientService,
    private modalCtrller: ModalController
  ) { }

  ngOnInit() {
    this.ingredientSvc
      .getIngredientSplitConfig(this.ingredient.id)
      .subscribe(data => {
        if (data !== null) {
          this.ingredientSplitConfig = Object.assign({}, data);
        }
      });
  }

  onSubmit() {
    this.ingredientSvc
      .consumeIngredient(
        this.ingredient.id,
        this.consume_qty,
        this.action,
        this.ingredientSplitConfig?.split2qty
      )
      .subscribe(res => {
        if (res.status === "ok") {
          this.modalCtrller.dismiss();
        } else {
          alert(res.msg);
        }
      });
  }

  close() {
    this.modalCtrller.dismiss(undefined, "cancel");
  }
}

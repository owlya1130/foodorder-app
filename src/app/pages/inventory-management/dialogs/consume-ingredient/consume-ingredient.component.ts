import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { ConsumeType, IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-consume-ingredient',
  templateUrl: './consume-ingredient.component.html',
  styleUrls: ['./consume-ingredient.component.scss'],
})
export class ConsumeIngredientComponent implements OnInit {

  @Input() ingredient: Ingredient;
  packageToIngredient: Ingredient = null;
  action = 'expired';
  consumeQty = 1;

  constructor(
    private ingredientSvc: IngredientService,
    private modalCtrller: ModalController
  ) { }

  ngOnInit() {
    this.ingredientSvc
      .getPackageList(this.ingredient.uid)
      .subscribe(data => {

        const packageList = data as Ingredient[];
        if (packageList.length === 1) {
          this.packageToIngredient = packageList[0];
        }
      });
  }

  onSubmit() {
    const action = this.action === 'packaged'? ConsumeType.Packaged : ConsumeType.Expired;
    this.ingredientSvc
      .consumeIngredient(
        this.ingredient.uid,
        this.consumeQty,
        action,
        this.packageToIngredient?.packageQty
      )
      .subscribe(res => {
        if ((res as Ingredient).uid !== null) {
          this.modalCtrller.dismiss();
        } else {
          alert('出貨失敗');
        }
      });
  }

  close() {
    this.modalCtrller.dismiss(undefined, 'cancel');
  }
}

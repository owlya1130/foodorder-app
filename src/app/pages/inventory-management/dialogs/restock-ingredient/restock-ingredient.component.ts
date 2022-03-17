import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-restock-ingredient',
  templateUrl: './restock-ingredient.component.html',
  styleUrls: ['./restock-ingredient.component.scss'],
})
export class RestockIngredientComponent implements OnInit {

  @Input() ingredient: Ingredient;
  addQty = 1;

  constructor(
    private ingredientSvc: IngredientService,
    private modalCtrller: ModalController
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.ingredientSvc
      .restockIngredient(this.ingredient.uid, this.addQty)
      .subscribe(res => {
        if((res as Ingredient).uid !== null){
          this.modalCtrller.dismiss();
        } else {
          alert("進貨失敗");
        }
      });
  }

  close() {
    this.modalCtrller.dismiss(undefined, 'cancel');
  }
}

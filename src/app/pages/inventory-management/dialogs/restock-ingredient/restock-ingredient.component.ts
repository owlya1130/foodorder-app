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
  addQty: number = 1;

  constructor(
    private ingredientSvc: IngredientService,
    private modalCtrller: ModalController
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.ingredientSvc
      .restockIngredient(this.ingredient.id, this.addQty)
      .subscribe(res => {
        if(res.status === "ok"){
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

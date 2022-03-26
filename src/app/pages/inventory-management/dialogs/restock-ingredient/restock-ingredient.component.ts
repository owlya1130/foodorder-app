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
  comment = '';

  constructor(
    private ingredientSvc: IngredientService,
    private modalCtrller: ModalController
  ) { }

  ngOnInit() { }

  onSubmit() {
    const subscriber = this.ingredientSvc
      .restockIngredient(this.ingredient.uid, this.addQty, this.comment)
      .subscribe(res => {
        if(res.uid !== null){
          this.modalCtrller.dismiss();
        } else {
          alert('進貨失敗');
        }
        subscriber.unsubscribe();
      });
  }

  close() {
    this.modalCtrller.dismiss(undefined, 'cancel');
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { IngredientActionType } from 'src/app/interfaces/ingredient-log';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-restock-ingredient',
  templateUrl: './restock-ingredient.component.html',
  styleUrls: ['./restock-ingredient.component.scss'],
})
export class RestockIngredientComponent implements OnInit {

  @Input() ingredient: Ingredient;

  form = new FormGroup({
    uid: new FormControl('', Validators.required),
    qty: new FormControl(1, [Validators.required, Validators.min(1)]),
    comment: new FormControl(''),
    actionType: new FormControl(IngredientActionType.Restock, Validators.required),
    cost: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  constructor(
    private ingredientSvc: IngredientService,
    private modalCtrller: ModalController
  ) { }

  ngOnInit() {
    this.form.patchValue({uid: this.ingredient.uid});
  }

  onSubmit() {
    console.log(this.form.getRawValue());
    const subscriber = this.ingredientSvc
      .restockIngredient(this.form.getRawValue())
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

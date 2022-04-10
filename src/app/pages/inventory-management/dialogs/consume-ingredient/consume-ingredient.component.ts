import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { IngredientActionType } from 'src/app/interfaces/ingredient-log';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-consume-ingredient',
  templateUrl: './consume-ingredient.component.html',
  styleUrls: ['./consume-ingredient.component.scss'],
})
export class ConsumeIngredientComponent implements OnInit {

  @Input() ingredient: Ingredient;
  packageToIngredient: Ingredient = null;
  form = new FormGroup({
    uid: new FormControl('', Validators.required),
    actionType: new FormControl(IngredientActionType.Expired),
    qty: new FormControl(0, [Validators.required, Validators.min(1)]),
    comment: new FormControl(''),
    packagedQty: new FormControl(1, [Validators.required, Validators.min(1)])
  });
  actionType = 'consume';

  constructor(
    private ingredientSvc: IngredientService,
    private modalCtrller: ModalController
  ) { }

  ngOnInit() {
    const subscriber = this.ingredientSvc
      .getPackageList(this.ingredient.uid)
      .subscribe(data => {
        const packageList = data;
        if (packageList.length === 1) {
          this.packageToIngredient = packageList[0];
          this.form.patchValue({
            packagedQty: this.packageToIngredient.packageQty
          });
        }
        subscriber.unsubscribe();
      });
    this.form.patchValue({
      uid: this.ingredient.uid
    });
  }

  onSubmit() {
    if (this.actionType === 'packaged') {
      this.form.patchValue({
        actionType: IngredientActionType.PackagedFrom
      });
    } else if (this.actionType === 'expired') {
      this.form.patchValue({
        actionType: IngredientActionType.Expired
      });
    } else if (this.actionType === 'consume') {
      this.form.patchValue({
        actionType: IngredientActionType.Consume
      });
    }
    const subscriber = this.ingredientSvc
      .consumeIngredient(this.form.getRawValue())
      .subscribe(res => {
        if (res.uid !== null) {
          this.modalCtrller.dismiss();
        }
        subscriber.unsubscribe();
      });
  }

  close() {
    this.modalCtrller.dismiss(undefined, 'cancel');
  }
}

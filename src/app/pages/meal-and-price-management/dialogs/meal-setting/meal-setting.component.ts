import { Ingredient } from 'src/app/interfaces/ingredient';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IngredientService } from 'src/app/services/ingredient.service';
import { MealAndPriceService } from 'src/app/services/meal-and-price.service';
import { MealClassificationService } from 'src/app/services/meal-classification.service';
import { Code } from 'src/app/interfaces/code';
import { Meal } from 'src/app/interfaces/meal';

@Component({
  selector: 'app-meal-setting',
  templateUrl: './meal-setting.component.html',
  styleUrls: ['./meal-setting.component.scss'],
})
export class MealSettingComponent implements OnInit {

  @Input() mealCfg: Meal;
  form = new FormGroup({
    uid: new FormControl(null),
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(30)]),
    classification: new FormGroup({
      uid: new FormControl('', Validators.required),
      type: new FormControl(null),
      name: new FormControl(null)
    }),
    mealIngredients: new FormArray([])
  });
  classfications: Code[] = [];
  ingredients: Ingredient[] = [];

  constructor(
    private classificationService: MealClassificationService,
    private ingredientSvc: IngredientService,
    private mpSvc: MealAndPriceService,
    private modalCtrller: ModalController
  ) { }

  get mealIngredients(): FormArray {
    return this.form.get('mealIngredients') as FormArray;
  }

  async ngOnInit() {

    await this.classificationService
      .findAll()
      .toPromise()
      .then(data => {
        this.classfications = data;
      });
    await this.ingredientSvc
      .findAll()
      .toPromise()
      .then(data => {
        this.ingredients = data;
      });

    if (this.mealCfg !== undefined) {
      this.form.patchValue(this.mealCfg);
      for (const mealIngredient of this.mealCfg.mealIngredients) {
        this.addIngredient(mealIngredient);
      }
    } else {
      this.addIngredient();
    }

  }

  addIngredient(mealIngredient?: {
    uid: {
      mealUid: string;
      ingredientUid: string;
    };
    ingredientQty: number;
  }) {
    const form = new FormGroup({
      uid: new FormGroup({
        mealUid: new FormControl(),
        ingredientUid: new FormControl(null, Validators.required)
      }),
      ingredientQty: new FormControl(1, [Validators.required, Validators.min(1)])
    });
    if (mealIngredient !== undefined) {
      form.patchValue(mealIngredient);
    }
    this.mealIngredients.push(form);
  }

  deleteIngredient(idx: number) {
    this.mealIngredients.removeAt(idx);
  }

  onSubmit() {
    console.log(this.form.getRawValue());
    const subscriber = this.mpSvc
      .saveOrUpdateMeal(this.form.getRawValue())
      .subscribe((data) => {
        this.modalCtrller.dismiss();
        subscriber.unsubscribe();
      });
  }

  close() {
    this.modalCtrller.dismiss(undefined, 'cancel');
  }
}

import { Ingredient } from 'src/app/interfaces/ingredient';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IngredientService } from 'src/app/services/ingredient.service';
import { MealAndPriceService } from 'src/app/services/meal-and-price.service';
import { MealClassificationService } from 'src/app/services/meal-classification.service';
import { Code } from 'src/app/interfaces/code';

@Component({
  selector: 'app-meal-setting',
  templateUrl: './meal-setting.component.html',
  styleUrls: ['./meal-setting.component.scss'],
})
export class MealSettingComponent implements OnInit {

  @Input() mealCfg;
  form = new FormGroup({
    id: new FormControl(''),
    typeUid: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(30)]),
    materials: new FormArray([])
  });
  classfications: Code[] = [];
  ingredients: Ingredient[] = [];

  constructor(
    private classificationService: MealClassificationService,
    private ingredientSvc: IngredientService,
    private mpSvc: MealAndPriceService,
    private modalCtrller: ModalController
  ) {
    const subscriber = this.classificationService
      .findAll()
      .subscribe(data => {
        this.classfications = data;
        subscriber.unsubscribe();
      });
    const subscriber1 =this.ingredientSvc
      .findAll()
      .subscribe(data => {
        this.ingredients = data;
        subscriber1.unsubscribe();
      });
  }

  get materials(): FormArray {
    return this.form.get('materials') as FormArray;
  }

  ngOnInit() {
    if (this.mealCfg !== undefined) {
      this.form.patchValue(this.mealCfg);
      for (const material of this.mealCfg.materials) {
        this.addMaterial(material);
      }
    } else {
      this.addMaterial();
    }
  }

  addMaterial(material?) {
    const form = new FormGroup({
      id: new FormControl('', Validators.required),
      qty: new FormControl(1, [Validators.required, Validators.min(1)])
    });
    if (material !== undefined) {
      form.patchValue(material);
    }
    this.materials.push(form);
  }

  deleteMaterial(idx: number) {
    this.materials.removeAt(idx);
  }

  onSubmit() {
    const subscriber = this.mpSvc
      .updateMealConfig(this.form.getRawValue())
      .subscribe((data) => {
        this.modalCtrller.dismiss();
        subscriber.unsubscribe();
      });
  }

  close() {
    this.modalCtrller.dismiss(undefined, 'cancel');
  }
}

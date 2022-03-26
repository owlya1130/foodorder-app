import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Meal } from 'src/app/interfaces/meal';

@Component({
  selector: 'app-modify-order-quantity',
  templateUrl: './modify-order-quantity.component.html',
  styleUrls: ['./modify-order-quantity.component.scss'],
})
export class ModifyOrderQuantityComponent implements OnInit {

  @Input() meals: Meal[];

  mealName: string;
  quantity: number;
  constructor(private modalCtrller: ModalController) { }

  ngOnInit() {
    this.mealName = this.meals[0].name;
    this.quantity = this.meals.length;
  }

  onSubmit() {
    const meal = Object.assign({}, this.meals[0]);
    while(this.quantity !== this.meals.length) {
      if(this.quantity > this.meals.length) {
        this.meals.push(meal);
      } else {
        this.meals.pop();
      }
    }
    this.modalCtrller.dismiss();
  }

  close() {
    this.modalCtrller.dismiss(undefined, 'cancel');
  }
}

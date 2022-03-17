import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MealAndPriceService {

  // 資料庫現有食材庫存
  private mealList = [{
    id: '0',
    name: '雞塊',
    price: 45,
    materials: [{
      id: '0',
      name: '雞塊(小)',
      qty: 1
    }]
  }, {
    id: '1',
    name: '薯條',
    price: 45,
    materials: [{
      id: '2',
      name: '薯條(小)',
      qty: 1
    }]
  }, {
    id: '2',
    name: '肉燥飯',
    price: 35,
    materials: [{
      id: '3',
      name: '白飯',
      qty: 1
    }, {
      id: '4',
      name: '肉燥',
      qty: 1
    }]
  }];

  private discountList = [{
    name: 'VIP',
    rule: {
      operator: '*',
      value: 80
    }
  }, {
    name: '滿500折30',
    rule: {
      operator: '-',
      value: 30
    }
  }];

  constructor() { }

  getMeals(): Observable<any> {
    return new Observable(subscriber=>{
      subscriber.next(this.mealList);
      subscriber.complete();
    });
  }

  getDiscounts(): Observable<any> {
    return new Observable(subscriber=>{
      subscriber.next(this.discountList);
      subscriber.complete();
    });
  }

  updateMealConfig(meal): Observable<any> {
    return new Observable(subscriber=>{
      this.mealList.push(meal);
      subscriber.next(meal);
      subscriber.complete();
    });
  }

  updateDiscountConfig(discount): Observable<any> {
    return new Observable(subscriber=>{
      this.discountList.push(discount);
      subscriber.next(discount);
      subscriber.complete();
    });
  }
}

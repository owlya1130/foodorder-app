import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Meal } from '../interfaces/meal';
import { DiscountConfig } from '../interfaces/discount-config';

@Injectable({
  providedIn: 'root'
})
export class MealAndPriceService {

  constructor(private http: HttpClient) { }

  getMeals() {
    return this.http.get<Meal[]>(`${environment.apiHist}/meal/list`);
  }

  saveOrUpdateMeal(meal: Meal) {
    if (meal.uid === null) {
      return this.http.post(`${environment.apiHist}/meal`, meal);
    } else {
      return this.http.put(`${environment.apiHist}/meal`, meal);
    }
  }

  getDiscounts() {
    return this.http.get<DiscountConfig[]>(`${environment.apiHist}/discount-config/list`);
  }

  updateDiscountConfig(discount) {
    if (discount.uid === null) {
      return this.http.post<DiscountConfig>(`${environment.apiHist}/discount-config`, discount);
    } else {
      return this.http.put<DiscountConfig>(`${environment.apiHist}/discount-config`, discount);
    }
  }
}

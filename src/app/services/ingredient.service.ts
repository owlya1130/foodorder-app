import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Consume } from '../interfaces/consume';
import { Ingredient } from '../interfaces/ingredient';
import { Restock } from '../interfaces/restock';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Ingredient[]>(`${environment.apiHist}/ingredient/list`);
  }

  saveOrUpdate(ingredient: Ingredient) {
    if (ingredient.uid === null) {
      return this.http.post<Ingredient>(`${environment.apiHist}/ingredient`, ingredient);
    } else {
      return this.http.put<Ingredient>(`${environment.apiHist}/ingredient`, ingredient);
    }
  }

  restockIngredient(restockBO: Restock) {
    return this.http.patch<Ingredient>(`${environment.apiHist}/ingredient/restock`, restockBO);
  }

  consumeIngredient(consumeBO: Consume) {
    return this.http.patch<Ingredient>(`${environment.apiHist}/ingredient/consume`, consumeBO);
  }

  getPackageList(ingredientUid: string) {
    return this.http.get<Ingredient[]>(`${environment.apiHist}/ingredient/${ingredientUid}/packagelist`);
  }
}

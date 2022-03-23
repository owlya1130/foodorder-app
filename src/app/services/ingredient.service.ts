import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ingredient } from '../interfaces/ingredient';

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
      return this.http.post(`${environment.apiHist}/ingredient`, ingredient);
    } else {
      return this.http.put(`${environment.apiHist}/ingredient`, ingredient);
    }
  }

  restockIngredient(ingredientUid: string, qty: number) {
    const ingredientBO = {
      uid: ingredientUid,
      qty: qty
    }
    return this.http.patch<Ingredient>(`${environment.apiHist}/ingredient/restock`, ingredientBO);
  }

  consumeIngredient(ingredientUid: string, qty: number, action: ConsumeType, packagedQty: number) {
    const ingredientBO = {
      uid: ingredientUid,
      qty: qty,
      action: action,
      packagedQty: packagedQty
    }
    return this.http.patch<Ingredient>(`${environment.apiHist}/ingredient/consume`, ingredientBO);
  }

  getPackageList(ingredientUid: string) {
    return this.http.get<Ingredient[]>(`${environment.apiHist}/ingredient/${ingredientUid}/packagelist`);
  }
}

export enum ConsumeType {
  Expired,
	Packaged
}

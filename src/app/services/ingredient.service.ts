import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../interfaces/ingredient';
import { IngredientSplitConfig } from '../interfaces/ingredient-split-config';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  // 資料庫現有食材庫存
  private ingredients: Ingredient[] = [{
    id: "0",
    name: "雞塊(小)",
    qty: 3,
    unit: "包",
    isInPacket: true
  }, {
    id: "1",
    name: "薯條(大)",
    qty: 2,
    unit: "包",
    isInPacket: false
  }, {
    id: "2",
    name: "薯條(小)",
    qty: 13,
    unit: "包",
    isInPacket: true
  }];

  // 資料庫食材分裝設定檔
  private ingredientSplitConfigs: IngredientSplitConfig[] = [{
    id: "1",
    name: "薯條(大)",
    split2id: "2",
    split2name: "薯條(小)",
    split2qty: 3
  }];

  constructor() { }

  /**
   * 取得材料庫存
   */
  getIngredients(): Observable<Ingredient[]> {

    return new Observable(subscriber => {
      subscriber.next(this.ingredients);
      subscriber.complete();
    });
  }

  /**
   * 新增材料
   * @param ingredient 
   * @returns 
   */
  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return new Observable(subscriber => {
      this.ingredients.push(ingredient);
      subscriber.next(ingredient);
      subscriber.complete();
    });
  }

  /**
   * 進貨
   * @param ingredient 
   * @param qty 
   * @returns 
   */
  restockIngredient(ingredientId: string, qty: number): Observable<Message> {

    // 後端取得目標後加上進貨數量

    return new Observable(subscriber => {
      const targets: Ingredient[] = this.ingredients.filter(x => x.id === ingredientId);
      if (targets.length > 0) {
        targets[0].qty = targets[0].qty + qty;
        subscriber.next({ msg: "進貨完成", status: "ok" });
      } else {
        subscriber.next({ msg: "找不到", status: "error" });
      }
      subscriber.complete();
    });
  }

  /**
   * 出貨
   * @param ingredientId 
   * @param qty 
   * @param action 
   * @param split2qty 
   * @returns 
   */
  consumeIngredient(ingredientId: string, qty: number, action: string, split2qty: number): Observable<Message> {

    // expired 過期直接扣除
    // split  拆小包裝案設定檔看幾份
    return new Observable(subscriber => {
      const targets: Ingredient[] = this.ingredients.filter(x => x.id === ingredientId);
      if (targets.length > 0) {
        targets[0].qty -= qty;
        if(action === "split") {
          const targetConfigs: IngredientSplitConfig[] = this.ingredientSplitConfigs.filter(x => x.id === ingredientId);
          const splitTargets: Ingredient[] = this.ingredients.filter(x => x.id === targetConfigs[0].split2id);
          splitTargets[0].qty += (qty*split2qty);
        }
        subscriber.next({ msg: "出貨完成", status: "ok" });
      } else {
        subscriber.next({ msg: "找不到", status: "error" });
      }
      subscriber.complete();
    });
  }

  /**
   * 取材料分裝設定檔
   * @param ingredientId 
   * @returns 
   */
  getIngredientSplitConfig(ingredientId: string): Observable<IngredientSplitConfig> {
    return new Observable(subscriber => {
      const targets: IngredientSplitConfig[] = this.ingredientSplitConfigs.filter(x => x.id === ingredientId);
      if (targets.length > 0) {
        subscriber.next(targets[0]);
      } else {
        subscriber.next(null);
      }
      subscriber.complete();
    });
  }
}

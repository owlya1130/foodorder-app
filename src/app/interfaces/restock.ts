import { IngredientActionType } from "./ingredient-log";

export interface Restock {
  uid: string;
  qty: number;
  comment: string;
  actionType: IngredientActionType;
  cost: number;
}

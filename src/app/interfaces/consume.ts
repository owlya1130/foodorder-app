import { IngredientActionType } from "./ingredient-log";

export interface Consume {
  uid: string;
  actionType: IngredientActionType;
  qty: number;
  comment: string;
  packagedQty: number;
}

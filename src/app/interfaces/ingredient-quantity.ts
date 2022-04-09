import { IngredientLog } from "./ingredient-log";

export interface IngredientQuantity {
  uid: number;
	ingredientUid: string;
	qty: number;
	cost: number;
	logs: IngredientLog[];
}

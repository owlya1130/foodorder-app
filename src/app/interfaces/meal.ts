import { Code } from "./code";

export interface Meal {
	uid: string;
	name: string;
	price: number;
	classification: Code;
	mealIngredients: {
    uid: {
      mealUid: string;
      ingredientUid: string;
    };
    ingredientQty: number;
  }[];
}

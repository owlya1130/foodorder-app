import { IngredientQuantity } from "./ingredient-quantity";

export interface Ingredient {
  uid: string | null;
  name: string;
  packageByUID: string | null;
  packageQty: number | null;
  quantityDetails: IngredientQuantity[];
}

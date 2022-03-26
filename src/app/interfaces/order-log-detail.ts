import { Meal } from "./meal";

export interface OrderLogDetail {
  uid: number | null;
  orderQty: number;
  meal: Meal;
}

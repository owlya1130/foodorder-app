export interface Ingredient {
  uid: string | null;
  name: string;
  qty: number;
  packageByUID: string | null;
  packageQty: number | null;
}

export interface IngredientLog {
  uid: number;
	batchno: string;
	time: Date;
	action: IngredientActionType;
	qty: number;
	comment: string;
}

export enum IngredientActionType {
	Restock,
	Expired,
	PackagedFrom,
  PackagedTo,
	Sold
}

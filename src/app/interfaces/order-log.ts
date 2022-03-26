import { OrderLogDetail } from "./order-log-detail";

export interface OrderLog {
  uid: number | null;
  orderTime: Date | null;
  serveTime: Date | null;
  cleanTime: Date | null;
  tableUid: string;
  details: OrderLogDetail[];
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderLog } from '../interfaces/order-log';

@Injectable({
  providedIn: 'root'
})
export class OrderLogService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<OrderLog[]>(`${environment.apiHist}/order-log/list`);
  }

  saveOrUpdate(orderLog: OrderLog) {
    if (orderLog.uid === null) {
      return this.http.post<OrderLog>(`${environment.apiHist}/order-log`, orderLog);
    } else {
      return this.http.put<OrderLog>(`${environment.apiHist}/order-log`, orderLog);
    }
  }
}

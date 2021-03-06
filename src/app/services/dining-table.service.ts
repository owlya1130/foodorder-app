import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DiningTable } from '../interfaces/dining-table';

@Injectable({
  providedIn: 'root'
})
export class DiningTableService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<DiningTable[]>(`${environment.apiHist}/dinningtable/list`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiningTableService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${environment.apiHist}/dinningtable/list`);
  }
}

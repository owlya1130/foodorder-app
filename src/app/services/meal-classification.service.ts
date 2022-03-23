import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Code } from '../interfaces/code';

@Injectable({
  providedIn: 'root'
})
export class MealClassificationService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Code[]>(`${environment.apiHist}/meal-classification/list`);
  }
}

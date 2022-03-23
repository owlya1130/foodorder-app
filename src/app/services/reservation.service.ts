import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  findAll(startDate: Date) {
    return this.http.get<Reservation[]>(`${environment.apiHist}/reservation/list`, {
      params: {
        start: startDate.toUTCString()
      }
    });
  }

  saveOrUpdate(reservation: Reservation) {
    if (reservation.uid === null) {
      return this.http.post(`${environment.apiHist}/reservation`, reservation);
    } else {
      return this.http.put(`${environment.apiHist}/reservation`, reservation);
    }
  }
}

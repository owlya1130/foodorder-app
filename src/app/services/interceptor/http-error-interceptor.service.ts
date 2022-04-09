import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DialogService } from '../component/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(
    private dialogSvc: DialogService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.dialogSvc.presentToast(error.error.message, 'danger');
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            // console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            // console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          // console.log(errorMsg);
          return throwError(errorMsg);
        })
      );
  }
}

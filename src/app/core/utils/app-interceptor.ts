import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    const newReq = req.clone({
      headers: req.headers.set('apikey', environment.apiKey),
    });

    return next.handle(newReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        const started = Date.now();
        const elapsed = Date.now() - started;
        console.log(
          `Request for ${req.urlWithParams} failed after ${elapsed} ms.`
        );
        // debugger;
        return throwError(() => new Error(error.toString()));
      })
    );
  }
}

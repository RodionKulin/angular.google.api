import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (!err) {
                return;
            }

            if (err.status === 401) {
                // show toast with predefined message here
                console.error('Access was denied');

                // redirect to login page
                // this._router.navigate(['/login'], { queryParams: { returnUrl: url } });
                return throwError(err);
            }

            const defaultErrorMessage = 'Error during server request';
            console.error(defaultErrorMessage);
            return throwError(err);
        }));
    }
}

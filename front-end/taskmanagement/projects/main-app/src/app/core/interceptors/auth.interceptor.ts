import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, catchError, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const token = authService.getToken();
  if (!token) { 
    return next(req)
  }

  const headers = new HttpHeaders({
    Authorization: token,
    ContentType: 'application/json',  
  })

  const newReq = req.clone({
    headers
  })

  return next(newReq)
}
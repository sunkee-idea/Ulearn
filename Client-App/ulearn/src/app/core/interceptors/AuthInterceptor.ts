import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../service/guard/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.Token}`
                }
            });
        return next.handle(request);
    }

}

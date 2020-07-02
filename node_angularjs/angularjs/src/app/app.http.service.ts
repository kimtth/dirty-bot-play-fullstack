import { Injectable } from '@angular/core';
import { HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, tap, finalize } from 'rxjs/operators';
import { MsgSession } from './app.msgSession';


@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }

  //getUrl = '/api/msgs'; //in-memory-service
  getUrl = '/api/msg';

  getMsg(reqMsg: string): Observable<MsgSession[]> {
    let httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    //Header for CORS
    httpHeaders.set('Access-Control-Allow-Origin', '*');
    httpHeaders.set('Access-Control-Allow-Credentials', 'true');
    httpHeaders.set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS')
    httpHeaders.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, content-type')

    let httpParams = new HttpParams();
    httpParams.set('reqMsg', reqMsg);

    let options = {
      headers: httpHeaders,
      params: httpParams
    };

    const url = this.getUrl + '?reqMsg=' + reqMsg;

    console.log('debug: start --->');
    return this.http.get<MsgSession[]>(url)
    .pipe(
      map(res => res as MsgSession[]),
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}


@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiReq = req.clone({ url: `http://127.0.0.1:4300${req.url}`});
    //const apiReq = req.clone({ url: `${req.url}` }); // no change
    return next.handle(apiReq);
  }
}

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          console.log(msg);
        })
      );
  }
}

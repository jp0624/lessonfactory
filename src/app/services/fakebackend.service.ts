import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
   constructor() {
        console.log()
   }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let TICKET_RESPONSE : any = JSON.parse(`  
         {  
            "email":"mailto:subatestuser1@janice.com",
            "registration_id":"cbecd1c2-f908-4f40-ba58-366c311537f2",
            "course_id":"520",
            "course_name":"Justatestcourse",
            "pass_mark":"1",
            "license_id":"1225",
            "user_id":"15453bff-30e0-4513-9e05-bc7b38af8e89",
            "lesson_id":"DRW",
            "lesson_type":"TYPE_LESSON",
            "lesson_uri":"https://fleetdefense.com/lesson/DRW",
            "lesson_name":"Drowsy Driving",
            "country_code":"US",
            "language_code":"en",
            "redirect_url":"https://fd.int.fleetdefense.com/mod/adxapilaunch/complete.php?id=3805",
            "course_code":"DDT"
         }`
         );
        
   return of(null).pipe( mergeMap(() => {
            if (request.url.endsWith('}') && request.method === 'GET') {
                return of(new HttpResponse({ status: 200, body: TICKET_RESPONSE }));
            }
             // pass through any requests not handled above
            return next.handle(request);
        }))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
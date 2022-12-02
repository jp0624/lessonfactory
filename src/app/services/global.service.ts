import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable()

export class GlobalService {

  public apiurl: string = environment.url_lesson_be;
  public assetsurl: string = environment.url_assets;
  public jsonurl: string = environment.url_assets;
  public lfa_apiurl: string = environment.url_lesson_api;
  public mode: string;
  public auth_key_lesson_api = environment.auth_key_lesson_api;
  public auth_value_lesson_api = environment.auth_value_lesson_api;
  public env: any = {};

  constructor(private http: HttpClient) {
    this.env = environment;
    if (this.env.envName && this.env.envName === 'default' ) {
      // this.jsonurl = 'http://localhost';
      this.jsonurl = this.env.jsonurl;
    }
  }

  getCourseInfo(params): Observable<any>{
    let lessonCode = params.lesson_code;
    let vehicle_type = params.vehicle_type;
    let searchQuery = `${lessonCode}/${vehicle_type}`;
    
    return this.http
      .get(`${this.apiurl}/getcourse/${searchQuery}`)
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error))
      );
  }


  getServerData(): Observable<any> {
    return this.http
      .get(`assets/json/server.json`)
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)
        )
      );
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const timeA = +a.question.time;
    const timeB = +b.question.time;

    let comparison = 0;
    if (timeA > timeB) {
      comparison = 1;
    } else if (timeA < timeB) {
      comparison = -1;
    }
    console.log('comparison: ', comparison);
    return comparison;
  }

}

import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {DeviceService} from '../services/device.service';
import {GlobalService} from '../services/global.service';

@Injectable()
export class TicketService {

  public preview: boolean = false;
  public sessionData = {
    username: '',
    user_id: '',
    email: '',
    registration_id: '',
    lesson_id: '',
    lesson_name: '',
    lesson_description: '',
    country_code: '',
    language_code: '',
    vehicle_type: '',
    course_code: '',
    version_code: '',
    redirect_url: '',
    pass_mark: ''
  };

  constructor(private http: HttpClient
    , private deviceService: DeviceService
    , private globalService: GlobalService) {
  }

  getTicketData(ticket): Observable<any> {
    console.error('Sending ticket: ', ticket);
    return this.http
      .get(`${this.globalService.lfa_apiurl}/decode-ticket/${ticket}`, {
        headers: new HttpHeaders()
          .set(this.globalService.auth_key_lesson_api, this.globalService.auth_value_lesson_api)
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)
        )
      );
    // .map((response: Response) => response)
    // .catch((error: any) => observableThrowError(error))
  }

  setSessionTicket(sessionData) {
    console.log('SESSION DATA: ', sessionData);
    for (const k in sessionData) {

      if (k === 'pass_mark') {
        if (this.deviceService.ssTest()) {
          sessionStorage.setItem('pass_mark', sessionData.pass_mark);
        }
      }

      if (typeof sessionData[k] !== 'function' && typeof sessionData[k] !== 'object') {
        console.error('k, sessionData[k]: ', k, sessionData[k]);

        if (this.deviceService.ssTest()) {
          sessionStorage.setItem(k, sessionData[k]);
        }
      }
    }
  }

  getSessionData() {

    for (const k in sessionStorage) {
      if (this.deviceService.ssTest()) {
        this.sessionData[k] = sessionStorage.getItem(k);
      }
    }

    console.log('SESSION DATA IS ENTERED: ', this.sessionData);
  }
}

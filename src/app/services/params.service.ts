import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GlobalService} from '../services/global.service';
import {TicketService} from '../services/ticket.service';
import {DeviceService} from '../services/device.service';

@Injectable()
export class ParamsService {

  public paramData = {
    initType: '',
    lesson_id: '',
    country_code: '',
    language_code: '',
    vehicle_type: '',
    course_code: '',
    version_code: '',
    ticket: ''
  };

  constructor(private http: HttpClient,
              private globalService: GlobalService,
              private ticketService: TicketService,
              private deviceService: DeviceService) {
  }

  getParam(name, url?) {
    if (!url) {
      url = window.location.href;
    }

    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);

    if (!results) {
      return null;
    } else if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  initParams() {

    let paramData = {
      initType: '',
      value: ''
    };

    //let siteUrl = new URL(window.location.href).searchParams;
    let siteUrl = window.location.href;
    console.log('siteUrl: ', siteUrl);


    console.log('siteUrl: ', siteUrl);
    //if(siteUrl.get('preview')){
    if (this.getParam('preview', siteUrl)) {
      this.globalService.mode = 'preview';
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log('++++++++++++++++++ ( PREVIEW MODE ) +++++++++++++++++++');
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      this.paramData.lesson_id = this.getParam('preview', siteUrl);
      this.paramData.country_code = this.getParam('country_code', siteUrl);
      this.paramData.language_code = this.getParam('language_code', siteUrl);
      this.paramData.vehicle_type = this.getParam('vehicle_type', siteUrl);      
      if (!this.paramData.vehicle_type || this.paramData.vehicle_type == 'null') {
        this.paramData.vehicle_type = 'PV';
      }
      this.paramData.version_code = this.getParam('version_code', siteUrl);
      if (!this.paramData.version_code || this.paramData.version_code == 'null') {
        this.paramData.version_code = null;
      }
      this.paramData.initType = 'local';
      if (window === top) {
        this.ticketService.setSessionTicket(this.paramData);
      }

      //} else if(siteUrl.get('local')){
    } else if (this.getParam('local', siteUrl)) {
      this.globalService.mode = 'local';
      this.paramData.lesson_id = this.getParam('local', siteUrl);
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log('+++++++++++++++++++ ( LOCAL MODE ) ++++++++++++++++++++');
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      this.paramData.initType = 'local';

      // in iframe
      // if (window != top){ }
      // not in iframe (demo mode)
      if (window === top) {
        this.ticketService.setSessionTicket(this.paramData);
      }

      //} else if(siteUrl.get('ticket')){
    } else if (this.getParam('ticket', siteUrl)) {
      this.globalService.mode = 'public';
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log('+++++++++++++++++++ ( TICKET MODE ) +++++++++++++++++++');
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');

      //let ticket = siteUrl.get('ticket');
      let ticket = this.getParam('ticket', siteUrl);
      this.paramData.ticket = ticket;
      this.paramData.initType = 'ticket';

    } else if (!this.deviceService.ssTest()) {
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log('++++++++++++ ( ERROR MODE | NO STORAGE ) ++++++++++++++');
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');

    } else if (sessionStorage.getItem('registration_id')) {
      this.ticketService.getSessionData();
      this.globalService.mode = 'public';
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log('++++++++++++++ ( SESSION(TICKET) MODE ) +++++++++++++++');
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');

      this.paramData.lesson_id = this.ticketService.sessionData.lesson_id;
      this.paramData.country_code = this.ticketService.sessionData.country_code;
      this.paramData.language_code = this.ticketService.sessionData.language_code;
      this.paramData.vehicle_type = this.ticketService.sessionData.vehicle_type;
      this.paramData.course_code = this.ticketService.sessionData.course_code;
      this.paramData.version_code = this.ticketService.sessionData.version_code;

      this.paramData.initType = 'session';

    } else if (sessionStorage.getItem('initType') === 'preview') {
      this.globalService.mode = 'preview';
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log('++++++++++++++ ( SESSION(PREVIEW) MODE ) ++++++++++++++');
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');

      this.paramData.lesson_id = sessionStorage.getItem('lesson_id');
      this.paramData.country_code = sessionStorage.getItem('country_code');
      this.paramData.language_code = sessionStorage.getItem('language_code');
      this.paramData.vehicle_type = sessionStorage.getItem('vehicle_type');
      this.paramData.course_code = sessionStorage.getItem('course_code');
      this.paramData.version_code = sessionStorage.getItem('version_code');
      this.paramData.initType = 'preview';

    } else if (sessionStorage.getItem('initType') === 'local') {
      this.globalService.mode = 'local';
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log('++++++++++++++ ( SESSION(LOCAL) MODE ) ++++++++++++++');
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');

      this.paramData.lesson_id = sessionStorage.getItem('lesson_id');
      this.paramData.country_code = sessionStorage.getItem('country_code');
      this.paramData.language_code = sessionStorage.getItem('language_code');
      this.paramData.vehicle_type = sessionStorage.getItem('vehicle_type');
      this.paramData.course_code = sessionStorage.getItem('course_code');
      this.paramData.version_code = sessionStorage.getItem('version_code');
      this.paramData.initType = 'local';
    }
    return paramData;

  }

}

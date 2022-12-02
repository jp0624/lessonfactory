import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {GlobalService} from './services/global.service';
import {ShellService} from './services/shell.service';
import {LessonDataService} from './services/lessondata.service';
import {BookmarkService} from './services/bookmark.service';
import {TicketService} from './services/ticket.service';
import {DictionaryService} from './services/dictionary.service';
import {DeviceService} from './services/device.service';
import {ParamsService} from './services/params.service';
import {TimerService} from './services/timer.service';

import {PreloadService} from './services/preload.service';
import {UpdateRoutesService} from './services/updateroutes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';
  public LessonDataService;
  public fontScale;

  private ticket;
  private video;
  private customFont;

  constructor(public lessonDataService: LessonDataService,
              public updateRoutesService: UpdateRoutesService,
              private globalService: GlobalService,
              private shellService: ShellService,
              private route: ActivatedRoute,
              private router: Router,
              private preloadService: PreloadService,
              private bookmarkService: BookmarkService,
              private ticketService: TicketService,
              private dictionaryService: DictionaryService,
              private deviceService: DeviceService,
              private paramsService: ParamsService,
              private time: TimerService) {
  }

  ngOnInit() {
    this.addInteractionListeners();
    this.time.startUpdateLoop();
    this.deviceService.detectDevice();
    this.checkParams();
    this.setBodyScale();

    if (!this.deviceService.lsTest()) {
      console.error('USER HAS DISABLED LOCAL STORAGE');
    }

    if (!this.deviceService.ssTest()) {
      console.error('USER HAS DISABLED SESSION STORAGE');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('RESIZE FIRED');
    this.shellService.getWindowSize();
    this.setBodyScale();
  }

  addInteractionListeners() {

    // window.addEventListener('contextmenu', (event) => {
    //     event.preventDefault();
    // }, false);

    window.addEventListener('touchmove', (event) => {
      let touches = event.touches.length;
      // console.log('TOUCHMOVE EVENT: ', event);
      if (touches > 1) {
        event.preventDefault();
      }

    }, false);

    let lastTouch = {
      time: 0,
      x: 0,
      y: 0,
      radius: 50
    };
    window.addEventListener('touchstart', (event) => {
      let t2 = event.timeStamp;
      let t1 = lastTouch.time || t2;
      let dt = t2 - t1;
      let touches = event.touches;

      lastTouch.time = t2;

      if (
        !dt
        || lastTouch.x === 0
        || lastTouch.y === 0
        || ((lastTouch.x - touches[0].clientX) > lastTouch.radius || (lastTouch.x - touches[0].clientX) < (lastTouch.radius * -1))
        || ((lastTouch.y - touches[0].clientY) > lastTouch.radius || (lastTouch.y - touches[0].clientY) < (lastTouch.radius * -1))
        || (((lastTouch.x - touches[0].clientX) < lastTouch.radius || (lastTouch.x - touches[0].clientX) > (lastTouch.radius * -1)) && dt > 750)
        || (((lastTouch.y - touches[0].clientY) < lastTouch.radius || (lastTouch.y - touches[0].clientY) > (lastTouch.radius * -1)) && dt > 750)
      ) {
        lastTouch.x = touches[0].clientX;
        lastTouch.y = touches[0].clientY;
        return;
      };

      // console.error('DOUBLE CLICK');
      event.preventDefault();

    });

  }

  checkParams() {

    this.paramsService.initParams();
    console.log('this.globalService.mode: ', this.globalService.mode);

    let initType = this.paramsService.paramData.initType;
    console.error('initType: ', initType);

    if (initType === 'preview') {
      this.getLessonData(this.paramsService.paramData);

    } else if (initType === 'local') {
      this.getLessonData(this.paramsService.paramData);    
    } else if (initType === 'ticket') {
      this.getTicketData(this.paramsService.paramData.ticket);
    } else if (initType === 'session') {
       this.ticketService.getSessionData();
      this.getLessonData(this.paramsService.paramData);
    }
  }

  getTicketData(ticket) {

    this.ticketService.getTicketData(ticket).subscribe(
      (data) => {
        console.log('TICKET RESPONSE: ', data);
        this.ticketService.sessionData = data;
        this.ticketService.setSessionTicket(data);
        



       this.getLessonData(data);
      },
      (err) => {
        console.log('ERROR: ', err);
      }
    );
  }

  setBodyScale() {
    var scaleSource = window.innerWidth,
      scaleFactor = 0.1,
      maxScale = 200,
      minScale = 30;

    var fontSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:
    if (fontSize > maxScale) fontSize = maxScale;
    if (fontSize < minScale) fontSize = minScale; //Enforce the minimum and maximums
    this.fontScale = (fontSize + '%');
  }

  getLessonData(params) {
    
    
     console.log('params : ');
    console.warn(params);

    let lesson_id: any = params.lesson_id;
    let vehicle_type: any = params.vehicle_type || 'PV';

    if(!params.lang_code){
      params.lang_code = 'EN';
    }
    if(!params.country_code){
      params.country_code = 'US';
    }
    if (!lesson_id) {
      lesson_id = this.ticketService.sessionData.lesson_id;
      vehicle_type = this.ticketService.sessionData.vehicle_type || 'PV';
    }
    let setData ={
        'lesson_code': (<string> lesson_id).toUpperCase(),
        'vehicle_type':  (<string> vehicle_type ).toUpperCase(),
        'course_code' : 'MM'
      };

    console.log('Set Data: ',  setData);
    
    this.lessonDataService.getOldLessonData(setData).
        subscribe(data => {
          data
          console.log('GET OLD LESSON DATA: ', data);
          this.updateData(params, data);
        },
        error => {
          console.log(error);
        }
      );
    // this.globalService.getCourseInfo(setData)
    //     .subscribe(data=> {                     
            // this.lessonDataService
            //   .getLessonDataLocalFromMedia(params)
            //   .subscribe((data) => {
            //      console.log('coming data'+data);
            //     this.updateData(params, data);
            //   },
            //   error => {
            //     console.log('error in app component'+error.status);
            //     if (error.status == 404){
            //       this.lessonDataService.getOldLessonData(params).
            //           subscribe(data => {
            //             data
            //             console.log(data);
            //             this.updateData(params, data);
            //           },
            //           error => {
            //             console.log(error);
            //           }
            //         );
            //     }
            //   });
            // });
      
    }

  updateData(params, data) {
    this.lessonDataService.dataLoaded = data.tasks;
    this.lessonDataService.getActivePage(params);
    this.updateRoutesService.updateRoutes(data.tasks);
    this.lessonDataService.lessonType = data.lesson_type;
    //SCORM User detecting start
    if (this.ticketService.sessionData.user_id) {
      //this.ticketService.sessionData.user_id = 'SCORM:fbf9244d-2f59-4e60-9dcc-cefa2ad4271a';
      if (this.ticketService.sessionData.user_id.includes("SCORM:")) {
      this.lessonDataService.scorm = true;
      console.log('this.scorm came include====>', this.lessonDataService.scorm);
      }
    }
    //SCORM User detecting end
    if (data.is_imperial == 1)
      this.lessonDataService.isImperial = true;
    if (data.is_metric == 1)
      this.lessonDataService.isMetric = true;      
    this.lessonDataService.textDir    = data.lang_dir;   
     for (let task of this.lessonDataService.dataLoaded) {       
       if (task.dictionary.length > 0) {
         this.dictionaryService.findDictionaryTerms(task.content, task.dictionary);
       }
      }
    
    this.bookmarkService.initBookmarkData();
   
    console.log('RESPONSE FROM GET LESSON REQUEST: ', data);
    console.log('this.router.config: ', this.router.config);
  }
}

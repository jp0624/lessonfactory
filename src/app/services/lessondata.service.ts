import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../services/global.service';
import {ShellService} from '../services/shell.service';
import {TicketService} from '../services/ticket.service';
import {DeviceService} from '../services/device.service';
import {ParamsService} from '../services/params.service';

@Injectable()
export class LessonDataService {
  public loading;
  public dataLoaded;
  public localLoaded;
  public activePage;
  public activePageId: number = 0;
  public lessonType: string;
  public prevPageId: number;
  public noBookMarksFound: boolean;
  private initLoad: boolean = true;
  public isMetric: boolean = false;
  public isImperial: boolean = false;
  public textDir: string;
  public scorm: boolean = false;
  private changeInit = new BehaviorSubject<number>(0);
  taskChange = this.changeInit.asObservable();
  public questionsRandomized: boolean = false;

  constructor(private route: ActivatedRoute
    , private router: Router
    , private globalService: GlobalService
    , private shellService: ShellService
    , private ticketService: TicketService
    , private http: HttpClient
    , private deviceService: DeviceService
    , private paramsService: ParamsService) {
  }

  emitChangeTask(toggle) {
    this.changeInit.next(toggle);
  }

  getXMLData(src): Observable<any> {
    return this.http
      .get(src, {responseType: 'text'})
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)
        )
      );
  }

  getLessonDataLocal(params): Observable<any> {
    console.warn('PARAMS: ', params);
    return this.http
      .get(`assets/json/db-${params.lesson_id}.json`)
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error))
      );
  }

// function start for dynamic data here

  getOldLessonData(params): Observable<any> {
    let deviceId =  this.deviceService.deviceId;
    console.log(deviceId);
    let lessonId = params.lesson_id;
    let countryCode = params.country_code ? params.country_code : 'US';
    let languageCode = params.language_code ? params.language_code : 'en';
    let versionCode = params.version_code ? params.version_code : 'null';
    let vehicleCode = params.vehicle_code ? params.vehicle_code : 'PV';
    this.noBookMarksFound = (params.initType === 'preview' || params.initType === 'session');

    console.log(`${this.globalService.apiurl}/lesson-v2/${countryCode}/${languageCode}/${lessonId}/${deviceId}/${vehicleCode}/${versionCode}`);

    console.log('PARAMS TO SEND: ', params);
    return this.http
    .get(`${this.globalService.apiurl}/lesson-v2/${countryCode}/${languageCode}/${lessonId}/${deviceId}/${vehicleCode}/${versionCode}`)
    .pipe(
      map((response: Response) => response),
      catchError((error: any) => observableThrowError(error))
    );
  }

  getLessonDataLocalFromMedia(params): Observable<any> {
    let lessoncode  = (<string> params.lesson_id).toLowerCase();
    let langcode    = (<string> params.language_code || 'en').toLowerCase();
    let countrycode = (<string> params.country_code).toLowerCase();
    let coursecode  = (<string> params.course_code).toLowerCase();
    let vehiclecode =  (<string> params.vehicle_type || 'PV').toLowerCase();
    let versioncode;
    if (params.version_code)
       versioncode = (<string> params.version_code).toLowerCase();
    let deviceId    =  this.deviceService.deviceId;

    let folderName  = 'default';
    if (versioncode)
      folderName  = versioncode;
    let filename = 'default';
    if (deviceId == 2)
      filename = 'mobile';
     let jsonUrl = `${this.globalService.jsonurl}/media/courses/${coursecode}/${lessoncode}/${vehiclecode}/${countrycode}/${langcode}/json/${folderName}/${filename}.json`;
     console.log(jsonUrl);
         return this.http
            .get(jsonUrl)
            .pipe(
                map( (response) => response),
                catchError((error: any) => observableThrowError(error)))    
  }

  // function end dynamic data here
  getJsonData(url): Observable<any> {
    return this.http
      .get(`${url}`)
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error))
      );
  }

  getActivePage(params?) {
    if (params.course_code === 'DDT' && !(params.version_code)) {
      this.randomizeQuestionForDTTLesson();
    }
    let pageName = this.router.url.replace(/\//g, '');
    if ((params.initType === 'local' || params.initType === 'preview') && !this.localLoaded) {
          this.activePageId = 0;
          this.activePage = this.dataLoaded[0];
        this.localLoaded = true;
      return;
    }

    for (let index in this.dataLoaded) {

      if (this.dataLoaded[index].name === pageName) {

        this.activePageId = +index;
        this.activePage = this.dataLoaded[+index];

      }
    }
   
  }

  gotoTask(idx) {
    console.log('GOTO TASK: ', idx);
    console.log('ACTIVE PAGE ID: ', this.activePageId);
    console.log('FUNCTION idx: ', idx);
    console.warn('this.paramsService.paramData.initType: ', this.paramsService.paramData.initType);

    if (((this.paramsService.paramData.initType === 'local') && (+this.activePageId !== +idx)) ||
      (+this.activePageId !== +idx) ||
      (this.noBookMarksFound && +this.activePageId === 0 && this.initLoad)) {
      this.initLoad = false;
      this.shellService.mainNav.status = false;

      console.log('DATA LOADED: ', this.dataLoaded);
      console.log('PAGE IDX: ', idx);
      console.log('PAGE ID: ', this.activePageId);

      this.dataLoaded[this.activePageId].position = 'left';
      this.dataLoaded[+idx].position = 'right';

      console.log('LEAVE TASK ', this.activePageId);

      setTimeout(() => {
        this.dataLoaded[+idx].position = 'center';
      });

      console.log('GOTO TASK ', +idx);
      this.activePageId = +idx;
      this.activePage = this.dataLoaded[+idx];
      this.router.navigate(['/' + this.dataLoaded[+idx].name], {replaceUrl: true});

    }
  }

  randomizeQuestionForDTTLesson() {
    if (this.questionsRandomized) {
          return;
         }
    
    this.questionsRandomized = true;
    let index = 0;
    let questionArray  = [];
    let remainingArray = [];
    // limit 10 question for DDT lesson
    let limitQuestion:number = 10;
    console.log('DTT RANDOMIZATION STARTS FOR QUESTION <<<<<<<<<<<<<>>>>');    
  
    // seperate questions  from the dataLoaded array
    while (index < this.dataLoaded.length) {
      Object.keys(this.dataLoaded[index].content).forEach(key => {
        if ('question' in this.dataLoaded[index].content[key]) {
            questionArray.push(this.dataLoaded[index]);  
            console.log('this.dataLoaded[index]=====>',this.dataLoaded[index]);    
        }
      })
      if (this.dataLoaded[index].task_type_id!=10){
        remainingArray.push(this.dataLoaded[index]); 
      }
      index++;
    }
    let userId =  sessionStorage.getItem('user_id');
    if (userId && userId.includes("SCORM:")) {
        let user_id = userId.split("SCORM:");
        userId = user_id[1];
        console.log('userID ====> for scorm randomization',userId);
    }
    let seed = userId ? parseInt(userId.split('-').join('').slice(5, 15), 16) : 1;
  
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
  
   const shuffle = (array, first, last) => {
      while (last > first) {
        let i = first + Math.floor(random() * last--);
        [array[i], array[last]] = [array[last], array[i]];
        i++;
        ++seed;
      }          
    };
  
    shuffle(questionArray, 0, questionArray.length - 1);  
    questionArray = questionArray.filter(function( element ) {
      return element !== undefined;
   });  
    console.log(' newQuestionArray ====================>',questionArray);
    let questionLength = questionArray.length;
    console.log(' newQuestionArray.length====================>',questionLength);
    let spliceNumber = questionLength - limitQuestion;
    console.log('spliceNumber====================>',spliceNumber);
    questionArray = questionArray.slice(spliceNumber);
    console.log('newQuestionArray contains 10====================>',questionArray);
    remainingArray.splice.apply(remainingArray, [remainingArray.length-1, 0].concat(questionArray));
    console.log('dataLoadingArray================================>>>>>>>>>>>>>>>>>>>',remainingArray);     
    // update the dataLoaded array with newly randomized question array contains only 10
    this.dataLoaded = remainingArray;
  }
}

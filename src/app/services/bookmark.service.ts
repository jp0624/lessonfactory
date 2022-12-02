import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

import {GlobalService} from '../services/global.service';
import {DeviceService} from '../services/device.service';
import {ShellService} from '../services/shell.service';
import {TicketService} from '../services/ticket.service';
import {LessonDataService} from '../services/lessondata.service';
import {ParamsService} from '../services/params.service';

@Injectable()
export class BookmarkService {

  private taskBookmark: any = {
    task_id: '_id',
    task_name: '_name',
    content: []
  };
  public sessionBookmarks = [];
  public storedBookmarks = [];
  public noBookMarksFound: Boolean;

  private bookmarkDataRequested = new BehaviorSubject<any>(false);
  bookmarkDataReceived = this.bookmarkDataRequested.asObservable();


  constructor(private route: ActivatedRoute
    , private router: Router
    , private globalService: GlobalService
    , private shellService: ShellService
    , private http: HttpClient
    , private ticketService: TicketService
    , private lessonDataService: LessonDataService
    , private paramsService: ParamsService
    , private deviceService: DeviceService) {
  }


  getBookmarkData(): Observable<any> {
    return this.http
      .get(`${this.globalService.lfa_apiurl}/bookmark-tasks/${this.ticketService.sessionData.registration_id}`, {
        headers: new HttpHeaders()
          .set(this.globalService.auth_key_lesson_api, this.globalService.auth_value_lesson_api)
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)
        )
      );
  }

  getAnswerData(): Observable<any> {
    return this.http
      .get(`${this.globalService.lfa_apiurl}/answers/${this.ticketService.sessionData.registration_id}`, {
        headers: new HttpHeaders()
          .set(this.globalService.auth_key_lesson_api, this.globalService.auth_value_lesson_api)
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)
        )
      );
  }

  pushBookmarkContent(content) {
    console.log('content', content);
    this.taskBookmark.content.push(content);
    console.log('this.taskBookmark.content: ', this.taskBookmark.content);
  }

  writeBookmark(task_id) {

    this.bookmarkDataRequested.next(true);

    console.warn('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> WRITE BOOKMARK <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    console.warn('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> WRITE BOOKMARK <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    console.error('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> WRITE BOOKMARK <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    console.error('this.ticketService:', this.ticketService);
    console.warn('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> WRITE BOOKMARK <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    console.warn('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> WRITE BOOKMARK <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    if (!this.taskBookmark.content.length) {
      let task_content = {
        content_type: 'other',
        content_id: 0,
        category: 'task',
        properties: {}
      };
      this.taskBookmark.content.push(task_content);
    }

    let bookmark = {
      task_id: task_id
    };
    this.sessionBookmarks.push(bookmark);

    if (this.paramsService.paramData.initType === 'preview') {
      // this.getLocalStoredBookmarkData();
      // this.parseBookmarks();
      // console.error('this.bookmarkService.sessionBookmarks: ', this.sessionBookmarks);
      // return;
    }

    // Adds a loading screen
    // this.lessonDataService.loading = true;

    this.postBookmarks(task_id)
      .subscribe(
        (data) => {
          console.warn('POST BOOKMARK RESULTS: ', data);
          // kill bookmark storage:
          this.storedBookmarks = [];
          if (this.deviceService.lsTest()) {
            localStorage.removeItem('lfa-bookmarks');
          }
          this.parseBookmarks();

        },
        (err) => {
          this.getLocalStoredBookmarkData();
          // this.parseBookmarks();
          console.warn('POST BOOKMARK ERROR: ', err);

        }
      );

  }
  
  resetTaskBookmark() {
    this.taskBookmark = {
      'task_id': '_id'
      , 'task_name': '_name'
      , 'content': []
    };
  }

  clearQuestionBookmarks(payload) {

    return this.http
      .post(`${this.globalService.lfa_apiurl}/void-bookmarks`, payload, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set(this.globalService.auth_key_lesson_api, this.globalService.auth_value_lesson_api)
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)
        )
      );
  }

  postBookmarks(task_id): Observable<any> {

    let sessionData = this.ticketService.sessionData;
    this.taskBookmark.task_id = task_id;

    if (this.lessonDataService.activePage.name) {
      this.taskBookmark.task_name = this.lessonDataService.activePage.name;
    } else {
      this.taskBookmark.task_name = 'Name Not Found';
    }

    let bookmarkData = Object.assign({}, sessionData, this.taskBookmark);

    this.resetTaskBookmark();

    //THIS OVERRIDES WAIT
    this.lessonDataService.gotoTask(this.lessonDataService.activePageId + 1);

    

    let status = this.storedBookmarks.filter(
      bookmark => bookmark.task_id === task_id
    );


    console.error('BOOKMARK STATUS: ', status);

    if (!status.length) {
      this.storedBookmarks.push(bookmarkData);
      console.error('BOOKMARK ALREADY EXISTS');
    }


    if (this.deviceService.lsTest()) {
      localStorage.setItem('lfa-bookmarks', JSON.stringify(this.storedBookmarks));
    }

    if (this.paramsService.paramData.initType === 'preview' || this.paramsService.paramData.initType === 'local') {

      this.getLocalStoredBookmarkData();
      return;
    }
    console.log(`${this.globalService.lfa_apiurl}/bookmark`);
    return this.http
      .post(`${this.globalService.lfa_apiurl}/bookmark`, this.storedBookmarks, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set(this.globalService.auth_key_lesson_api, this.globalService.auth_value_lesson_api)
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)
        )
      );
  }

  writeEssentialBookmark(task_id, task_name, content) {
    this.bookmarkDataRequested.next(true);
    let bookmark: any = {
      task_id: task_id
    };
    this.sessionBookmarks.push(bookmark);
    // Adds a loading screen
     this.essentialBookmark(task_id, task_name, content) .subscribe(
    (data) => {
      console.warn('POST BOOKMARK RESULTS: ', data);
      // kill bookmark storage:
      this.storedBookmarks = [];
      if (this.deviceService.lsTest()) {
        localStorage.removeItem('lfa-bookmarks');
      }
      this.parseBookmarks();
    },
    (err) => {
      this.getLocalStoredBookmarkData();
      console.warn('POST BOOKMARK ERROR: ', err);
    }
  );
  }

  essentialBookmark(task_id, task_name, content): Observable<any> {   
      let sessionData = this.ticketService.sessionData;
      this.taskBookmark.task_id = task_id;
      this.taskBookmark.task_name = task_name;        
      this.taskBookmark.content.push(content);  
      let postbookmarkDataObject = Object.assign({}, sessionData, this.taskBookmark);  
      let postbookmarkData = [];
      postbookmarkData.push(postbookmarkDataObject);
      this.resetTaskBookmark();
      console.log('Essential bookmark data=====>', postbookmarkData)
      return this.http
        .post(`${this.globalService.lfa_apiurl}/bookmark`, postbookmarkData, {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set(this.globalService.auth_key_lesson_api, this.globalService.auth_value_lesson_api)
        })
        .pipe(
          map((response) => response),
          catchError((error: any) => observableThrowError(error)
          )
        );
  }

  postLessonComplete() {
    console.log('Post Lesson Complete!');
    const payload = {'registration_id': this.ticketService.sessionData.registration_id};

    return this.http
      .post(`${this.globalService.lfa_apiurl}/lesson-complete`, JSON.stringify(payload), {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set(this.globalService.auth_key_lesson_api, this.globalService.auth_value_lesson_api)
      })
      .pipe(
        map((response) => response),
        catchError((error: any) => observableThrowError(error)
        )
      );
  }

  resetStorage() {
    this.sessionBookmarks = [];
    this.storedBookmarks = [];
  }

  initBookmarkData() {
    this.resetStorage();

    
  if (this.paramsService.paramData.initType === 'preview') {
       this.getLocalStoredBookmarkData();
       return;
    }
    console.log('========================================');
    console.log('=======( GET INIT BOOKMARK DATA )=======');
    console.log('========================================');
    this.getBookmarkData()
      .subscribe(
        (data) => {
          for (let bookmark of data) {
            this.sessionBookmarks.push(bookmark);
          }
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET this.sessionBookmarks: ', this.sessionBookmarks);
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET BOOKMARK DATA: ', data);
          this.getLocalStoredBookmarkData();
        },
        (err) => {
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET BOOKMARK ERROR: ', err);

          if (err.status == 404) {
            console.log(err.message);
            this.lessonDataService.noBookMarksFound = true;
            this.getLocalStoredBookmarkData();
          } else {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET BOOKMARK ERROR: ', err);
            this.getLocalStoredBookmarkData();
          }

        }
      );
  }

  getLocalStoredBookmarkData() {

    let localStoredBookmarks;

    if (this.deviceService.lsTest()) {
      console.log('STORED BOOKMARKS: ', JSON.parse(localStorage.getItem('lfa-bookmarks')));
      localStoredBookmarks = JSON.parse(localStorage.getItem('lfa-bookmarks'));
    }

    if (!localStoredBookmarks) {
      console.warn('NO STORED BOOKMARKS IN LOCAL STORAGE');
      this.parseBookmarks();

    } else if (localStoredBookmarks.length) {
      console.warn('FOUND STORED BOOKMARKS IN LOCAL STORAGE');
      // console.log()
      this.storedBookmarks = [];
      this.sessionBookmarks = [];

      for (let bookmark of JSON.parse(localStorage.getItem('lfa-bookmarks'))) {
        let tempBookmark = {
          task_id: bookmark.task_id
        };
        this.sessionBookmarks.push(tempBookmark);
        this.storedBookmarks.push(bookmark);
      }
      this.parseBookmarks();
    }
  }

  parseBookmarks() {
    this.lessonDataService.loading = true;
    console.error('this.sessionBookmarks', this.sessionBookmarks);
    console.error('this.storedBookmarks', this.storedBookmarks);
    console.error('this.lessonDataService.dataLoaded', this.lessonDataService.dataLoaded);

    for (let task of this.lessonDataService.dataLoaded) {

      for (let bookmark of this.sessionBookmarks) {
        //console.log('compare: ' + (+task.task_id) + ' ' + (+bookmark.task_id));
        if (+task.task_id === +bookmark.task_id) {
          task.complete = true;
          console.error('=====================================(bookmark found): ', bookmark.task_id);
          break;
        } else {
          task.complete = false;
          // console.error('=====================================(bookmark NOT found): ', bookmark.task_id)
        }

      }

    }
    //this.lessonDataService.gotoTask(0)
    this.setLatestBookmark();
  }

  setLatestBookmark() {
    let nextTask;

    for (let index in this.lessonDataService.dataLoaded) {
      if (!this.lessonDataService.dataLoaded[index].complete) {

        nextTask = index;
        break;

      }
    }
    console.log('nextTask: ', nextTask);
    if (!nextTask) {
      nextTask = 0;
      nextTask = this.lessonDataService.dataLoaded.length - 1;
    }

    this.lessonDataService.loading = false;
    if(nextTask !== this.lessonDataService.activePageId){
      this.lessonDataService.gotoTask(nextTask);
    }


    this.bookmarkDataRequested.next(false);


  }

}

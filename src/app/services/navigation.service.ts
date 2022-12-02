import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {LessonDataService} from './lessondata.service';
import {TicketService} from './ticket.service';
import {BookmarkService} from './bookmark.service';
import {GlobalService} from './global.service';


@Injectable()
export class NavigationService {
  private activeContent;
  private nextFunc = {
    type: '',
    time: 0,
    hide: false,
    percent: 0,
    lock: ''
  };

  private changeInit = new BehaviorSubject<number>(0);
  navigationChange = this.changeInit.asObservable();

  private nextClickInit = new BehaviorSubject<any>('');
  nextClick = this.nextClickInit.asObservable();

  private makingApiCall: Boolean;

  constructor(private lessonDataService: LessonDataService,
              private globalService: GlobalService,
              private bookmarkService: BookmarkService,
              private ticketService: TicketService) {
  }

  updateNavigationBtn(data) {
    console.log('++++++++++++++++++++++++++++++');
    console.log('++++++++++++++++++++++++++++++');
    console.log('this.activeContent: ', data);
    console.log('++++++++++++++++++++++++++++++');
    console.log('++++++++++++++++++++++++++++++');
    this.activeContent = data;
    this.nextFunc.lock = this.activeContent.type;

    if (this.activeContent.index < this.activeContent.length) {
      this.nextFunc.type = 'content';
    } else if (this.activeContent.pageId < this.activeContent.pageLength) {
      this.nextFunc.type = 'page';
    } else {
      this.nextFunc.type = 'complete';
    }

    this.nextFunc.hide = ['hidden', 'init-func', 'video-complete'].indexOf(this.activeContent.type) !== -1;

    if (this.activeContent.type === 'none') {
      this.nextFunc.time = 0;
      this.emitChangeBtnChange(this.nextFunc);
    } else if (this.activeContent.type === 'time-char') {
      this.nextFunc.time = this.activeContent.chars.length * this.activeContent.time;
      this.emitChangeBtnChange(this.nextFunc);

    } else if (this.activeContent.type === 'time-page') {
      this.nextFunc.time = this.activeContent.time;
      this.emitChangeBtnChange(this.nextFunc);

    } else if (this.activeContent.type === 'download') {
      this.nextFunc.percent = this.activeContent.download;
      this.emitChangeBtnChange(this.nextFunc);
    }

  }

  emitChangeBtnChange(data) {
    console.error('NAV SERVICE: ', data);
    console.error('NAV SERVICE: ', data);
    this.changeInit.next(data);
  }

  emitChangeBtnFunc(type) {
    console.error('NAV SERVICE: ', type);
    console.error('NAV SERVICE: ', type);
    console.error('NAV SERVICE: ', type);
    this.nextClickInit.next(type);
  }

  nextBtnClick(next_id?, type?) {

    console.log('NEXT BUTTON CLICKED');
    console.log('Next Func: ', this.nextFunc);
    console.log('this.lessonDataService: ', this.lessonDataService);
    console.log('TYPE: ', type);
    console.log('globalService.mode: ', this.globalService.mode);

    const isLastPage = (this.lessonDataService.activePageId === this.lessonDataService.dataLoaded.length - 1);

    console.log('ON LAST PAGE:', isLastPage);

    if (this.nextFunc.type === 'content') {

      this.emitChangeBtnFunc('content');

    } else if ((this.nextFunc.type === 'page') || (type === 'page')) {
      console.log('Type: ', type);
      this.emitChangeBtnFunc('page');

      if (!isLastPage) {

        let task_id = this.lessonDataService.dataLoaded[this.lessonDataService.activePageId].task_id;
        this.bookmarkService.writeBookmark(task_id);

        // if (this.globalService.mode === 'public') {
        //     let task_id = this.lessonDataService.dataLoaded[this.lessonDataService.activePageId].task_id;
        //     this.bookmarkService.writeBookmark(task_id);
        //     // let status = this.bookmarkService.sessionBookmarks.filter(bookmark => bookmark.task_id === task_id);
        // } else {
        //     let task_id = this.lessonDataService.dataLoaded[this.lessonDataService.activePageId].task_id;
        //     this.bookmarkService.writeBookmark(task_id);
        //     // let status = this.bookmarkService.sessionBookmarks.filter(bookmark => bookmark.task_id === task_id);
        // }

        //this.nextTask();

      }
    } else if (!this.nextFunc.type && !type) {
      console.log('TYPE NOT DEFINED');
    }


    if (this.globalService.mode === 'public') {

      console.log('ON LAST PAGE:', isLastPage);

      if (isLastPage && !this.makingApiCall) { //if congrats page and not already making api call
        console.log('ON LAST PAGE');
        console.log('CALLING POST LESSON COMPLETE');
        this.postLessonComplete();

      }

    }


  }

  nextTask() {

    console.error('this.lessonDataService.dataLoaded.length: ', this.lessonDataService.dataLoaded.length);
    console.error('this.lessonDataService.activePageId: ', this.lessonDataService.activePageId);
    // this.lessonDataService.gotoTask(this.lessonDataService.activePageId + 1);

    //this.bookmarkService.writeBookmark(task_id)
    //this.bookmarkService.initBookmarkData();

  }


  postLessonComplete() {
    this.makingApiCall = true;
    this.lessonDataService.loading = true;
    this.bookmarkService
      .postLessonComplete()
      .subscribe(
        (data) => {
          console.log('POST LESSON COMPLETE RESULTS: ', data);
          window.location.href = this.ticketService.sessionData.redirect_url;

          // if (data.response.success == true) {
          //     window.location.href = this.ticketService.sessionData.redirect_url;
          // } else {
          //     console.warn('POST LESSON COMPLETE - LRS query not successful, returns: ', data.response.success);
          // }

          //this.makingApiCall = false;

        },
        (err) => {

          console.warn('POST LESSON COMPLETE ERROR: ', err);
          this.makingApiCall = false;
        });

  }
}

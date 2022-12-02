import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs';

import {TimerService} from './timer.service';
import {GlobalService} from './global.service';
import {LessonDataService} from './lessondata.service';
import {BookmarkService} from './bookmark.service';

@Injectable({
  providedIn: 'root'
})
export class BandwidthService {

  public bandwidthData = {
    settings: {
      activeFormat: -1,
      threshold: 0,
      loadProgress: 0,
      complete: false,
      initialTime: 0,
      testImg: '/media/courses/global/components/bandwidth/image_5mb.jpg'
    },
    formats: []
  };

  private changeInit = new BehaviorSubject<number>(0);
  formatChange = this.changeInit.asObservable();

  constructor(private http: HttpClient
    , private globalService: GlobalService
    , private timerService: TimerService
    , private lessonDataService: LessonDataService
    , private bookmarkService: BookmarkService) {
  }

  start(componentData) {

    this.bandwidthData.settings.initialTime = this.timerService.curTime;
    console.error(HttpEventType);

    if (componentData.settings.data) {
      console.log('componentData.settings.data: ', componentData.settings.data);
      this.bandwidthData.settings.testImg = componentData.settings.data;
    }

    this.bandwidthData.formats = componentData.formats;

    const req = new HttpRequest('GET',
      `${this.globalService.assetsurl}${this.bandwidthData.settings.testImg}?${this.bandwidthData.settings.initialTime}`,
      {
        reportProgress: true,
        responseType: 'blob'
      });

    this.http.request(req).subscribe(
      event => {

        if (event.type === HttpEventType.DownloadProgress) {
          this.bandwidthData.settings.loadProgress = +(100 * event.loaded / event.total).toFixed(2);
          this.bandwidthData.settings.threshold = +this.getMbs(event.loaded);

          if (event.loaded === event.total) {
            this.bandwidthData.settings.complete = true;
            this.checkFormat();
          } else {
            this.bandwidthData.settings.complete = false;
          }

        } else if (event.type === HttpEventType.ResponseHeader
          || event.type === HttpEventType.Response) {

          // Bandwidth testing done
          this.bandwidthData.settings.loadProgress = 100;
          this.bandwidthData.settings.complete = true;
          this.checkFormat();

        }

      });
  }

  checkStatus() {
    if (!this.bandwidthData.settings.complete) {
      for (let task of this.lessonDataService.dataLoaded) {
        if (task.pagetype === 'BandwidthComponent') {
          task.complete = false;
        }
      }
      this.bookmarkService.setLatestBookmark();
    }
  }

  checkFormat() {

    for (const i of Object.keys(this.bandwidthData.formats)) {

      if (this.bandwidthData.settings.threshold > this.bandwidthData.formats[i].threshold) {
        this.setFormat(i);
      } else {
        this.bandwidthData.formats[i].active = false;
      }

      this.changeInit.next(+i);
    }

  }

  setFormat(i) {
    this.bandwidthData.settings.activeFormat = +i;
    this.bandwidthData.formats[i].active = true;
  }

  getMbs(bits) {
    const seconds: number = (this.timerService.curTime - this.bandwidthData.settings.initialTime);
    return +(((bits * 8 / (seconds / 1000)) / 1024) / 1024).toFixed(2);
  }
}

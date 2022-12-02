import {Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {ShellService} from '../../../../../services/shell.service';

import {NavigationService} from '../../../../../services/navigation.service';
import {BandwidthService} from '../../../../../services/bandwidth.service';
import {LessonDataService} from '../../../../../services/lessondata.service';
import {BookmarkService} from '../../../../../services/bookmark.service';
import {TransformService} from '../../../../../services/transform.service';
import {GlobalService} from '../../../../../services/global.service';

import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-interactivevideoscene',
  templateUrl: './interactivevideoscene.component.html',
  styleUrls: ['./interactivevideoscene.component.scss']
})
export class InteractivevideosceneComponent implements OnInit, OnDestroy {
  @Input()
  activePage;
  @Input()
  activePageId;
  @Input()
  wrapperSize;

  @Output()
  contentStatus: EventEmitter<any> = new EventEmitter();

  @ViewChild('header')
  headerEl: ElementRef;
  @ViewChild('canvas')
  canvasEl: ElementRef;
  @ViewChild('content')
  contentEl: ElementRef;

  private headerSize = {x: 0, y: 0};
  private canvasSize = {x: 0, y: 0};
  private contentSize = {x: 0, y: 0};
  private figureSize = {x: 0, y: 0};
  private aspectRatio = {
    x: 0.4921875,
    y: 2.031746031746032
    // x: 0.5625,
    // y: 1.777777777777778
  };
  private winSizeSubscription;
  private formatSubscription;

  private componentData = {
    headings: {},
    settings: {},
    formats: []
  };

  private taskContent = {
    content_type: 'other',
    content_id: 0,
    category: 'question',
    attempt: 0,
    properties: {
      question: '',
      choices: [],
      score: 0,
      user_selected: []
    }
  };

  private videoBlob;
  private processed;
  private vidPlay;
  private content = [];
  private contentId = 0;
  private activeContent = {
    'chars': '',
    'index': 0,
    'length': 0,
    'time': 10,
    'type': 'int-func',
    'download': 0
  };

  private subscription;


  private videoscene = {
    summary: null,
    details: {
      content: null,
      heading: '',
      icons: []
    },
    video: {
      content: '',
      heading: '',
      settings: {
        src: ''
      },
      score: {
        identify: 0,
        reaction: 0,
        attempt: 0,
        total: 0,
        possible: 0
      },
      coords: {
        core: '',
        attempts: 0,
        xml: '',
        data: [],
        start: 0,
        end: 0
      }
    }
  };

  constructor(private http: HttpClient
    , private shellService: ShellService
    , private navigationService: NavigationService
    , private bandwidthService: BandwidthService
    , private lessonDataService: LessonDataService
    , private bookmarkService: BookmarkService
    , public transformService: TransformService
    , public globalService: GlobalService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.getInitSizing();
  }

  ngOnInit() {
    this.getComponentData();
    this.getSceneCoords();
    this.getInitSizing();
    this.getActiveContent();

    console.error('this.videoscene: ', this.videoscene);

    this.subscription = this.navigationService.nextClick
      .subscribe(event => {
        if (event === 'content') {
          this.next();
        }
      });
  }

  ngOnDestroy(): void {
    this.taskContent.content_id = 0;
    this.subscription.unsubscribe();
  }

  scoreComplete(event) {

    let correct;

    if (event.status === 'correct') {
      correct = true;
      this.videoscene.video.score.identify = event.possible;
      this.videoscene.video.score.attempt = event.id * -1;
    } else {
      this.videoscene.video.score.identify = 0;
    }

    let reactionBonus;
    let bonusInterval = (+this.videoscene.video.coords.end - +this.videoscene.video.coords.start) / 3;

    /* tslint:disable:max-line-length */
    if (!correct) {
      reactionBonus = 0;
    } else if (event.activeFrame < +this.videoscene.video.coords.start) {
      reactionBonus = 3;
    } else if (event.activeFrame > +this.videoscene.video.coords.end) {
      reactionBonus = 0;
    } else if (event.activeFrame > +this.videoscene.video.coords.start && event.activeFrame < (+this.videoscene.video.coords.start + bonusInterval)) {
      reactionBonus = 3;
    } else if (event.activeFrame > +this.videoscene.video.coords.start && event.activeFrame < (+this.videoscene.video.coords.start + (bonusInterval * 2))) {
      reactionBonus = 2;
    } else if (event.activeFrame > +this.videoscene.video.coords.start && event.activeFrame < (+this.videoscene.video.coords.start + (bonusInterval * 3))) {
      reactionBonus = 1;
    }
    /* tslint:enable:max-line-length */


    this.videoscene.video.score.reaction = reactionBonus;
    this.videoscene.video.score.possible = +this.videoscene.video.coords.attempts + 3;
    this.videoscene.video.score.total = this.videoscene.video.score.identify + this.videoscene.video.score.attempt + reactionBonus;

    console.log('videoscene:', this.videoscene);
    console.log('SCORE SENT: ', event);
    console.log('START FRAME: ', +this.videoscene.video.coords.start);
    console.log('END FRAME: ', +this.videoscene.video.coords.end);
    console.log('SCORE SENT: ', event);
    console.warn('FINAL SCORE: ', this.videoscene.video.score);

    this.taskContent.category = this.videoscene.video.coords.core;
    this.taskContent.properties.question = this.videoscene.details.content;
    this.taskContent.properties.score = 100 / this.videoscene.video.score.possible * this.videoscene.video.score.total;
    this.bookmarkService.pushBookmarkContent(this.taskContent);

    if (this.content.length <= this.contentId + 1) {
      this.activePage.lockType = 'none';
      this.vidPlay = false;
      this.getActiveContent();
    } else {
      this.next();
    }

  }

  next() {

    ++this.contentId;

    console.log('this.content[this.contentId]: ', this.content[this.contentId]);
    console.log('this.content[this.contentId]: ', this.content[this.contentId]);
    console.log('this.content[this.contentId]: ', this.content[this.contentId]);
    console.log('this.content[this.contentId]: ', this.content[this.contentId]);
    console.log('[this.contentId]: ', this.contentId);
    console.log('this.content.length: ', this.content.length);
    console.log('this.content: ', this.content);
    console.log('this.content[this.contentId]: ', this.content[this.contentId]);
    console.log('this.content[this.contentId]: ', this.content[this.contentId]);
    console.log('this.content[this.contentId]: ', this.content[this.contentId]);
    console.log('this.content[this.contentId]: ', this.content[this.contentId]);

    // ++this.contentId;

    if (this.content[this.contentId] === 'video') {
      // this.activePage.lockType = 'int-func'
      this.activePage.lockType = 'video-complete';
      this.vidPlay = true;
      setTimeout(() => {
        this.vidPlay = false;
      }, 10);
      setTimeout(() => {
        this.vidPlay = true;
      }, 1250);

    } else if (this.content[this.contentId] === 'details') {
      this.activePage.lockType = 'time-char';
    } else {
      this.activePage.lockType = 'time-char';
    }
    this.getActiveContent();


    this.getInitSizing();

  }

  getInitSizing() {

    setTimeout(() => {
      this.getContentSize();
      this.getHeaderSize();
      if (this.activePage.pagecenter) {
        this.sizeCanvas();
      }
    }, 50);
  }

  getContentSize() {
    this.contentSize = {
      x: this.contentEl.nativeElement.offsetWidth,
      y: this.contentEl.nativeElement.offsetHeight
    };
  }

  getHeaderSize() {
    this.headerSize = {
      x: this.headerEl.nativeElement.offsetWidth,
      y: this.headerEl.nativeElement.offsetHeight
    };
  }

  sizeCanvas() {
    this.canvasSize = {
      x: this.wrapperSize.x,
      y: this.wrapperSize.y - this.headerSize.y - this.contentSize.y
    };

    if (this.canvasSize.x > this.canvasSize.y) {
      // console.log('size width');
      this.figureSize = {
        x: this.canvasSize.y * this.aspectRatio.y,
        y: this.canvasSize.y
      };
      if (this.figureSize.x > this.canvasSize.x) {

        this.figureSize = {
          x: this.canvasSize.x,
          y: this.canvasSize.x * this.aspectRatio.x
        };
      }

    } else if (this.canvasSize.y > this.canvasSize.x) {
      this.figureSize = {
        x: this.canvasSize.x,
        y: this.canvasSize.x * this.aspectRatio.x
      };
      if (this.figureSize.y > this.canvasSize.y) {

        this.figureSize = {
          x: this.canvasSize.y * this.aspectRatio.y,
          y: this.canvasSize.y
        };
      }

    }
  }

  getComponentData() {

    console.log('???????????????????????????????????????????????????????????????');
    console.log('???????????????????????????????????????????????????????????????');
    console.log('???????????????????????????????????????????????????????????????');
    console.log('??????????(            GETTING SCENE DATA           )??????????');
    console.log('???????????????????????????????????????????????????????????????');
    console.log('???????????????????????????????????????????????????????????????');
    console.log('this.activePage.content: ', this.activePage.content);
    this.activePage.processed = true;

    const content = this.activePage.content;

    Object.keys(content).forEach(key => {

      console.log('item[key]: ', content[key]);
      if ('coords' in content[key]) {
        this.videoscene.video.coords = content[key].settings;
        this.videoscene.video.coords.xml = content[key].coords.xml;

      } else if ('video' in content[key]) {
        this.videoscene.video.settings = content[key].video;
        this.videoscene.video.heading = content[key].headings.heading;
        this.videoscene.video.content = content[key].figcaption.text;

      } else if ('summary' in content[key]) {
        this.videoscene.summary = content[key].summary;

      } else if ('details' in content[key]) {
        this.videoscene.details = content[key].details;
        // this.videoscene.details.icons = content[key].icons;

        let icons = [];
        if (content[key].icons.env_svg) {
          let temp = {
            type: 'environment',
            src: content[key].icons.env_svg
          };
          icons.push(temp);
        } else {
          let temp = {
            type: 'environment',
            src: content[key].icons.env_src
          };
          icons.push(temp);
        }
        if (content[key].icons.road_svg) {
          let temp = {
            type: 'road',
            src: content[key].icons.road_svg
          };
          icons.push(temp);
        } else {
          let temp = {
            type: 'road',
            src: content[key].icons.road_src
          };
          icons.push(temp);
        }
        if (content[key].icons.traffic_svg) {
          let temp = {
            type: 'traffic',
            src: content[key].icons.traffic_svg
          };
          icons.push(temp);
        } else {
          let temp = {
            type: 'traffic',
            src: content[key].icons.traffic_src
          };
          icons.push(temp);
        }

        this.videoscene.details.icons = icons;

      }

    });

    if ((this.videoscene.video.settings[480]
        || this.videoscene.video.settings[720]
        || this.videoscene.video.settings[1080])
      && !this.bandwidthService.bandwidthData.settings.complete) {

      this.bandwidthService.checkStatus();
    } else {

      if (this.videoscene.details.content) {
        this.content.push('details');
      }
      if (this.videoscene.video.settings.src) {
        this.content.push('video');
      }
      if (this.videoscene.summary) {
        this.content.push('summary');
      }

      console.log('this.content: ', this.content);

      if (this.videoscene.video.settings[480]
        || this.videoscene.video.settings[720]
        || this.videoscene.video.settings[1080]) {
        this.getVideoSrc();
      }

      setTimeout(() => {

        this.loadVideo(this.globalService.assetsurl + this.videoscene.video.settings.src, (progress) => {
          console.warn(progress);
          this.getActiveContent(progress);
        });

        console.log('this.videoscene: ', this.videoscene);

      }, 1500);


    }


  }

  getVideoSrc() {
    let quality = +this.bandwidthService.bandwidthData.formats[this.bandwidthService.bandwidthData.settings.activeFormat]['quality'];

    if (this.videoscene.video.settings[quality]) {
      this.videoscene.video.settings.src = this.videoscene.video.settings[quality];
      console.log('this.videoscene.video.settings.src: ', this.videoscene.video.settings.src);
    }
  }

  // CHANGE THIS TO USE REQUEST ANIMATE FRAME TO AVOID FREEZING
  loadVideo(url: string, callback: (progress: number) => void) {
    const req = new HttpRequest('GET', url, {
      reportProgress: true,
      responseType: 'blob'
    });

    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.DownloadProgress) {
        const progress = 100 * event.loaded / event.total;
        callback(progress);
      } else if (event instanceof HttpResponse) { // Video downloaded
        this.videoBlob = event.body;

      } else {
        callback(0);
      }

    });
  }

  getActiveContent(download?) {
    let ammount = download || 0;

    this.activeContent.chars = '';
    this.activeContent.index = this.contentId + 1;
    this.activeContent.length = this.content.length;
    this.activeContent.time = this.activePage.lockTime;
    this.activeContent.type = this.activePage.lockType;
    this.activeContent.download = ammount;

    this.contentStatus.emit(this.activeContent);
  }

  getSceneCoords() {

    this.lessonDataService.getXMLData(this.globalService.assetsurl + this.videoscene.video.coords.xml)
      .pipe(
        map(res => this.transformService.convertToJson(res))
      )
      .subscribe((res: any) => {

          console.error('resp: ', res);
          this.videoscene.video.coords.data = [];

          for (let coord of res.Animations.Animation.Part) {
            let tempCoord = [];
            for (let coordData of coord.Frame) {
              tempCoord.push(coordData.$);
            }
            this.videoscene.video.coords.data.push(tempCoord);
          }

        },
        (err) => {
          console.log('ERROR: ', err);
        }
      );
  }

}

import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {ShellService} from '../../../../../services/shell.service';
import {LessonDataService} from '../../../../../services/lessondata.service';
import {NavigationService} from '../../../../../services/navigation.service';
import {GlobalService} from '../../../../../services/global.service';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-videoswap',
  templateUrl: './videoswap.component.html',
  styleUrls: ['./videoswap.component.scss']
})
export class VideoswapComponent implements OnInit, OnDestroy {
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

  private componentData = {
    settings: {
      preload: 0,
      toggles: 0
    },
    videos: [],
    content: {
      heading: null,
      text: null
    },
    contentId: -1,
    timestamps: [],
    buttons: []
  };

  private activeContent = {
    chars: '',
    index: 0,
    length: 0,
    time: 10,
    type: 'int-func', //'time-char'
    download: 0
  };

  private headerSize = {x: 0, y: 0};
  private canvasSize = {x: 0, y: 0};
  private contentSize = {x: 0, y: 0};
  private figureSize = {x: 0, y: 0};
  private aspectRatio = {
    x: 0.5625,
    y: 1.777777777777778
  };
  private initSized = false;
  private winSizeSubscription;

  private videoSrc;
  private selected;
  private vidPlay;
  private btnPlay = true;
  private activeClass;
  private viewedCount = 0;

  private videoBlob;
  private videoPaused;
  private subscription;

  constructor(private http: HttpClient
    , private globalService: GlobalService
    , private shellService: ShellService
    , private navigationService: NavigationService
    , private lessonDataService: LessonDataService
    , private rd: Renderer2) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {
    this.getComponentData();
    this.getActiveContent(0);
    this.getInitSizing();

    this.subscription = this.navigationService.nextClick
      .subscribe(event => {
        if (event === 'content') {
          this.next(event);
        }
      });

    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        this.getInitSizing();
      });
  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  next(event, i?) {

    this.componentData.contentId = this.componentData.contentId + 1;
    console.log('NEXT EVENT: ', event);
    console.log('NEXT i: ', i);
    
    this.vidPlay = true;

    this.getActiveContent();
    this.getInitSizing();

  }

  videoComplete() {
  }

  videoTime(event) {
    if (this.componentData.contentId === -1) {
      return;
    }
    // console.log('Cur time: ', event);
    // console.log('Pause at time:', +this.assessment.questions[this.activeQuestion].question.time);
    let curtime = event;
    // if (curtime > +this.componentData.timestamps[this.componentData.contentId].time && !this.videoPaused) {
    //   console.log('PAUSE VIDEO');
    //   this.btnPlay = false;
    //   this.vidPlay = false;

    //   // this.activeContent.type = 'time-char';
    
    //   if (+this.componentData.timestamps[this.componentData.contentId].custom_btns) {
    //     this.activeContent.type = 'hidden';
    //   } else {
    //     this.activeContent.type = 'time-char';
    //   }
    //   this.getActiveContent();

    //   setTimeout(() => {
    //     this.videoPaused = true;
    //   }, 250);
    // }
    //console.log('VIDEO TIME: ', event);
    // this.next();
  }

  viewCount(){
    console.log('VIEWED++');
    
    if(+this.componentData.settings.toggles === ++this.viewedCount){
      console.log('ENABLE BUTTON!');
      
      this.activeContent.type = 'time-char';
      this.componentData.contentId = this.componentData.contentId + 1;
      this.getActiveContent();
    }

  }
  getComponentData() {

    console.log('this.activePage.content: ', this.activePage.content);
    let content = this.activePage.content;

    Object.keys(content).forEach(key => {

      if ('settings' in content[key]) {
        if(content[key].settings.heading){
          this.componentData.content.heading = content[key].settings.heading;
        }
        this.componentData.settings = content[key].settings;
        
      } else if ('video' in content[key]) {
        
        if(content[key].video.heading){
          this.componentData.content.heading = content[key].video.heading;
        }

        if(content[key].video.content){
          this.componentData.content.text = content[key].video.content;
        }

        this.componentData.videos.push(content[key].video);

      } else if ('button' in content[key]) {
        this.componentData.buttons.push(content[key].button);
        
      }

    });

    console.log('this.componentData: ', this.componentData);
    console.log('this.componentData: ', this.componentData);
    console.log('this.componentData: ', this.componentData);

    if (+this.componentData.settings.preload === 1) {
      this.activeContent.type = 'download';
      setTimeout(() => {
        // this.loadVideo(this.globalService.assetsurl + this.componentData.videos[0].src, (progress) => {
        // this.loadVideo('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', (progress) => {
        //   console.warn(progress);
        //   this.getActiveContent(progress);
        // });

        this.loadVideoArr(this.componentData.videos);


      }, 1250);

    } else {
      this.activeContent.type = 'time-char';
      this.getActiveContent();
    }

    this.componentData.timestamps.sort(this.compare);

  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const timeA = +a.time;
    const timeB = +b.time;

    let comparison = 0;
    if (timeA > timeB) {
      comparison = 1;
    } else if (timeA < timeB) {
      comparison = -1;
    }
    console.log('comparison: ', comparison);
    return comparison;
  }

  loadVideoArr(videos) {
    let ammount = videos.length;

    for(let video of videos){
      this.loadVideo(this.globalService.assetsurl + video.url, (progress) => {
      // this.loadVideo('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', (progress) => {
        video.progress = progress / ammount;
        this.getActiveContent(this.calcProgress(videos));
      });
    }

  }
  calcProgress(arr){
    let totalProgress = 0;
    for(let item of arr) {
      console.warn('video progress: ', item.progress);
      totalProgress += item.progress
    }
    console.error('array progress: ', totalProgress);
    return totalProgress;
  }
  
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

  toggleClass(className) {
    this.activeClass = className;
  }
  clearClass() {
    this.activeClass = '';
  }

  getActiveContent(download?) {
    let ammount = download || 0;

    if (this.componentData.contentId === -1) {
      // this.activeContent.chars = this.componentData.content.heading
      // this.activeContent.chars += this.componentData.content.text;
      this.activeContent.chars = '';
    } else {
      console.log('this.componentData.timestamps[this.componentData.contentId]: ', this.componentData.timestamps[this.componentData.contentId]);
      console.log('this.componentData.contentId: ', this.componentData.contentId);

      this.activeContent.chars = this.componentData.content.heading;
      this.activeContent.chars += this.componentData.content.text;
      console.log('this.activeContent.chars: ', this.activeContent.chars);
    }
    console.error('this.activeContent: ', this.activeContent)
    //this.activeContent.chars = '';
    // this.activeContent.index = this.componentData.contentId;
    this.activeContent.index = this.componentData.contentId + 1;
    // this.activeContent.length = this.componentData.timestamps.length;
    this.activeContent.length = 1;
    this.activeContent.time = this.activePage.lockTime;

    this.activeContent.download = ammount;

    // console.log('this.activeContent: ', this.activeContent.chars)
    this.contentStatus.emit(this.activeContent);
  }

  getInitSizing() {

    setTimeout(() => {
      this.getContentSize();
      this.getHeaderSize();

      if (this.activePage.pagecenter) {
        //console.log('headerSize: ', this.headerSize);
        //console.log('contentSize: ', this.contentSize);
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
    this.headerSize;
    this.contentSize;

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
      // console.log('size height');
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
    setTimeout(() => {
      this.initSized = true;
    }, 50);
  }

}

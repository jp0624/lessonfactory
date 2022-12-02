import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ShellService} from '../../../../../services/shell.service';
import {LessonDataService} from '../../../../../services/lessondata.service';
import {NavigationService} from '../../../../../services/navigation.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {
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

  @HostBinding('class.animating') animating: boolean = false;

  private activeContent = {
    'chars': '',
    'index': 0,
    'length': 0,
    'time': 10,
    'type': 'time-char'
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
  private slideShow = {
    settings: {
      activeSlide: 0
    },
    slides: []
  };
  private subscription;

  constructor(private shellService: ShellService,
              private navigationService: NavigationService,
              private lessonDataService: LessonDataService,
              private rd: Renderer2) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // this.getInitSizing();
  }

  ngOnInit() {
    this.getComponentData();
    // this.getInitSizing();

    this.slideShow.settings.activeSlide = 0;

    this.subscription = this.navigationService.nextClick
      .subscribe(event => {
        if (event === 'content') {
          this.next();
        }
      });

    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        //this.getInitSizing();
      });
  }

  next() {
    this.animating = true;
    setTimeout(() => {
      this.animating = false;
    }, 1000);

    console.log('this.activeScene: ', this.slideShow.settings.activeSlide);
    this.slideShow.settings.activeSlide++;
    this.getActiveContent();
    // this.getInitSizing();
  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  // getInitSizing(){

  //   setTimeout( ()=> {
  //     this.getContentSize();
  //     this.getHeaderSize();

  //       if(this.activePage.pagecenter){
  //           //console.log('headerSize: ', this.headerSize);
  //           //console.log('contentSize: ', this.contentSize);
  //           this.sizeCanvas();
  //       }

  //   }, 50);
  // }
  // getContentSize() {
  //   this.contentSize = {
  //     x: this.contentEl.nativeElement.offsetWidth,
  //     y: this.contentEl.nativeElement.offsetHeight
  //   }
  // }
  // getHeaderSize() {
  //   this.headerSize = {
  //     x: this.headerEl.nativeElement.offsetWidth,
  //     y: this.headerEl.nativeElement.offsetHeight
  //   }
  // }
  // sizeCanvas(){
  //   this.headerSize;
  //   this.contentSize;

  //   this.canvasSize = {
  //     x: this.wrapperSize.x,
  //     y: this.wrapperSize.y - this.headerSize.y - this.contentSize.y
  //   }

  //   if(this.canvasSize.x > this.canvasSize.y) {
  //     // console.log('size width');
  //     this.figureSize = {
  //       x: this.canvasSize.y * this.aspectRatio.y,
  //       y: this.canvasSize.y
  //     }
  //     if(this.figureSize.x > this.canvasSize.x){

  //       this.figureSize = {
  //         x: this.canvasSize.x,
  //         y: this.canvasSize.x * this.aspectRatio.x
  //       }
  //     }

  //   } else if(this.canvasSize.y > this.canvasSize.x) {
  //     // console.log('size height');
  //     this.figureSize = {
  //       x: this.canvasSize.x,
  //       y: this.canvasSize.x * this.aspectRatio.x
  //     }
  //     if(this.figureSize.y > this.canvasSize.y){

  //       this.figureSize = {
  //         x: this.canvasSize.y * this.aspectRatio.y,
  //         y: this.canvasSize.y
  //       }
  //     }

  //   }
  //   setTimeout( ()=> {
  //     this.initSized = true;
  //   }, 50);
  // }
  getComponentData() {
    let content = this.activePage.content;

    Object.keys(content).forEach(key => {

      console.log('item[key]: ', content[key]);

      //this.questionData.push(content[key]);
      if ('settings' in content[key]) {

        console.log('Found Stage: ', key);
        this.slideShow.settings = content[key].settings;

      } else if ('figure' in content[key]) {

        console.log('Found scene: ', key);
        this.slideShow.slides.push(content[key]);

      } else if ('headings' in content[key]) {

        console.log('Found scene: ', key);
        this.slideShow.slides.push(content[key]);

      }

    });
    this.getActiveContent();
    console.log('SLIDES: ', this.slideShow.slides);


  }

  getActiveContent() {
    console.error('this.activeScene: ', this.slideShow.settings.activeSlide);
    console.warn('this.scenes[this.activeScene]: ', this.slideShow.slides[this.slideShow.settings.activeSlide]);

    this.activeContent.chars = this.slideShow.slides[this.slideShow.settings.activeSlide].headings.heading;

    if (this.slideShow.slides[this.slideShow.settings.activeSlide].figcaption) {
      this.activeContent.chars += this.slideShow.slides[this.slideShow.settings.activeSlide].figcaption.text;
    }
    if (this.slideShow.slides[this.slideShow.settings.activeSlide].headings.text) {
      this.activeContent.chars += this.slideShow.slides[this.slideShow.settings.activeSlide].headings.text;
    }

    this.activeContent.index = this.slideShow.settings.activeSlide + 1;
    this.activeContent.length = this.slideShow.slides.length;
    this.activeContent.time = this.activePage.lockTime;
    this.activeContent.type = this.activePage.lockType;

    this.contentStatus.emit(this.activeContent);
  }
}

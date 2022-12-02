import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ShellService} from '../../../../../services/shell.service';
import {LessonDataService} from '../../../../../services/lessondata.service';
import {NavigationService} from '../../../../../services/navigation.service';
import {TimerService} from '../../../../../services/timer.service';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-imageswap',
  templateUrl: './imageswap.component.html',
  styleUrls: ['./imageswap.component.scss']
})
export class ImageswapComponent implements OnInit, OnDestroy, AfterViewInit {
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

  private activeContent = {
    'chars': '',
    'index': 0,
    'length': 0,
    'time': 10,
    'type': 'int-func'
  };

  private headerSize = {x: 0, y: 0};
  private canvasSize = {x: 0, y: 0};
  private contentSize = {x: 0, y: 0};
  private figureSize = {x: 0, y: 0};
  private aspectRatio = {
    x: 0.5625,
    y: 1.777777777777778
  };
  private winSizeSubscription;
  private activeSlide: number = 0;
  private slideTimer: number;
  private slideContent = {
    heading: '',
    content: '',
    src: '',
    alt: ''
  };

  private componentData = {
    settings: {
      delay: 0,
      fullscreen: 0,
      loop: 0,
      speed: 0,
      complete: false
    },
    slides: [],
    buttons: []
  };

  private timeSubscription;
  private subscription;

  constructor(private time: TimerService,
              private shellService: ShellService,
              private navigationService: NavigationService,
              private lessonDataService: LessonDataService,
              private rd: Renderer2) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {
    this.activeSlide = 0;
    this.getComponentData();
    this.getInitSizing();
    this.getActiveContent();

    this.slideTimer = this.time.curTime;

    this.subscription = this.navigationService.nextClick
      .subscribe(event => {
        if (event === 'content') {

        }
      });

    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        this.getInitSizing();
      });
  }

  ngAfterViewInit() {

    this.timeSubscription = this.time.timeChange
      .subscribe(change => {

        if (this.slideTimer + +this.componentData.settings.speed < this.time.curTime && !this.componentData.settings.complete) {

          this.slideTimer = this.time.curTime;
          if (this.activeSlide + 1 < this.componentData.slides.length) {

            this.swapSlide(++this.activeSlide);
          } else {
            this.swapSlide(0);
          }
        }
      });

  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  showResult() {
    this.componentData.settings.complete = true;

    this.activeContent.type = 'time-char';
    this.getActiveContent();
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
  }

  getComponentData() {
    let content = this.activePage.content;

    Object.keys(content).forEach(key => {

      console.log('item[key]: ', content[key]);

      //this.questionData.push(content[key]);
      if ('settings' in content[key]) {

        console.log('Found Settings: ', key);
        this.componentData.settings = content[key].settings;

      } else if ('figure' in content[key]) {

        console.log('Found slide: ', key);
        this.componentData.slides.push(content[key]);

      } else if ('button' in content[key]) {

        console.log('Button slide: ', key);
        this.componentData.buttons.push(content[key]);

      }

    });
    console.log('this.componentData:', this.componentData);
    this.setSlide();
  }

  setSlide() {
    // this.componentData.slides[this.activeSlide]
    console.warn('this.slideContent: ', this.slideContent);
    console.warn('this.componentData.slides[this.activeSlide]: ', this.componentData.slides[this.activeSlide]);
    if (this.componentData.slides[this.activeSlide].headings.heading) {

      this.slideContent.heading = this.componentData.slides[this.activeSlide].headings.heading;
    }
    if (this.componentData.slides[this.activeSlide].figcaption.text) {
      this.slideContent.content = this.componentData.slides[this.activeSlide].figcaption.text;
    }
    // if(this.componentData.slides[this.activeSlide].figure.src.length){
    //   this.slideContent.src = this.componentData.slides[this.activeSlide].figure.src;
    // }

  }

  swapSlide(i) {
    this.activeSlide = i;
  }

  getActiveContent() {
    // console.error('this.activeScene: ', this.activeScene);
    // console.warn('this.scenes[this.activeScene]: ', this.scenes[this.activeScene]);
    // this.activeContent.chars = this.scenes[this.activeScene].heading;
    // this.activeContent.chars += this.scenes[this.activeScene].text;
    // this.activeContent.index = this.activeScene + 1;
    // this.activeContent.length = this.scenes.length;
    // this.activeContent.time = this.activePage.lockTime;
    // this.activeContent.type = this.scenes[this.activeScene].lockType;

    this.contentStatus.emit(this.activeContent);
  }
}

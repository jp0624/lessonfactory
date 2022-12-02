import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {ShellService} from '../../../../../services/shell.service';
import {GlobalService} from '../../../../../services/global.service';
import {NavigationService} from '../../../../../services/navigation.service';
import {LessonDataService} from '../../../../../services/lessondata.service';

@Component({
  selector: 'app-imagesequence',
  templateUrl: './imagesequence.component.html',
  styleUrls: ['./imagesequence.component.scss']
})
export class ImagesequenceComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input()
  activePage;
  @Input()
  activePageId;
  @Input()
  wrapperSize;

  @Output()
  contentStatus: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.rtl')
  isRtl: boolean = false;

  @ViewChild('header')
  headerEl: ElementRef;
  @ViewChild('canvas')
  canvasEl: ElementRef;
  @ViewChild('content')
  contentEl: ElementRef;
  @ViewChild('range')
    rangeEl: ElementRef;

  private content = [];
  private contentId = 0;
  private activeContent = {
    'chars': '',
    'index': 0,
    'length': 1,
    'time': 10,
    'type': 'func-int' //'time-char'
  };

  private headerSize = {x: 0, y: 0};
  private canvasSize = {x: 0, y: 0};
  private contentSize = {x: 0, y: 0};
  private figureSize = {x: 0, y: 0};
  private aspectRatio = {
    x: 0.5625,
    y: 1.777777777777778
  };

  private touchStart = false;
  private touchMove = false;
  private touchEnd = false;
  private thumbPos = {
    x: 0,
    y: 0
  }

  private subscription;
  private sequence;
  private sequenceLoaded = 0;
  private sequenceToLoad = 0;
  private sequenceLoadComplete = false;
  private sequenceStartImg;
  private sequencePath;
  private sequenceLength;
  private activeSequenceImg;
  private winSizeSubscription;

  private initComplete = false;
  private rangeWidth = 0;
  private rangeStart = false;
  private rangeEnd = false;
  private rangeCurrent;
  private rangeComplete = false;

  constructor(private shellService: ShellService,
              private navigationService: NavigationService,
              private rd: Renderer2,
              private lessonDataService: LessonDataService,
              private globalService: GlobalService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {
    if (this.lessonDataService.textDir === 'rtl') {
      this.isRtl = true;
    }
    console.log('>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<', this.rangeEl)
    console.log('>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<', this.rangeEl)
    console.log('>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<', this.rangeEl)
    console.log('>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<', this.rangeEl)

    this.getContent();
  

    setTimeout(() => {
      this.initComplete = true;
    }, 1250);

    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        this.getInitSizing();
      });    
    
    this.subscription = this.navigationService.nextClick
      .subscribe(event => {
        if (event === 'content') {
          this.next();
        }
      });

  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  rangeTouchStart(e){
    // console.log(this.rangeWidth);
    // console.log(this.rangeEl);
    this.touchStart = true;
    // console.log('Touch Start Seq: ', e);
    // console.log('this.rangeWidth: ', this.rangeWidth);
    // console.log('e.offsetX: ', e.offsetX)
    if(this.touchStart && e.offsetX){
      let percentX = 100 / this.rangeWidth * e.offsetX
      this.moveThumb(percentX);

    } else if(e.targetTouches){
      let rect = e.target.getBoundingClientRect();
      let offsetX = e.targetTouches[0].pageX - rect.left;
      
      let percentX = 100 / this.rangeWidth * offsetX
      this.moveThumb(percentX);
    }
  }
  rangeTouchMove(e){
    // console.log('Touch Move Seq: ', e);
    if(this.touchStart && e.offsetX){
      let percentX = 100 / this.rangeWidth * e.offsetX
      this.moveThumb(percentX);

    } else if(e.targetTouches){
      let rect = e.target.getBoundingClientRect();
      let offsetX = e.targetTouches[0].pageX - rect.left;
      // let y = e.targetTouches[0].pageY - rect.top;

      let percentX = 100 / this.rangeWidth * offsetX
      this.moveThumb(percentX);
    }

  }
  rangeTouchEnd(e){
    this.touchStart = false;
    // console.log('Touch End')
    console.log('Touch End Seq: ', e);
  }
  moveThumb(x){
    console.log(x)
    if(x < 0){
      x = 0;
    }else if(x > 100){
      x = 100
    }
    this.thumbPos.x = x;
    this.setActiveSequenceImg(x)
    this.updateRangeData(this.thumbPos.x)
  }
  setActiveSequenceImg(x){
    
    this.activeSequenceImg = Math.round(this.sequence.length * (x * 0.01));
    if(this.activeSequenceImg <= 0){
      this.activeSequenceImg = 1;
    } else if(this.activeSequenceImg >= this.sequence.length){
      this.activeSequenceImg = this.sequence.length - 1;
    }
    
  }

  next() {
    console.log('MOVE TO NEXT FUNCTION CALLED');
  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }
  preloadImages(urls, loadedCallback){
    this.sequenceLoaded = 0;

    for(let url of urls){
      this.preloadImage(url, () => {
          
        console.log('Number of loaded images: ' + this.sequenceLoaded);
          this.sequenceLoaded++;
          if(this.sequenceLoaded == this.sequenceToLoad){
            loadedCallback();
          }

      });

    }
  }
  preloadImage(url, loadedCallback){
      let img = new Image();
      img.src = this.globalService.assetsurl + this.sequencePath + '/' + url;
      img.onload = loadedCallback;
  }
  updateRangeData(percent){
    if(this.rangeComplete){
      return;
    }
    if(percent <= 10){
      this.rangeStart = true;
    }
    if(percent >= 90){
      this.rangeEnd = true;
    }
    if(this.rangeEnd && this.rangeStart){
      this.activeContent.type = 'time-char';
      this.activeContent.index = 1;
      this.getActiveContent();
      this.rangeComplete = true;
    }

  }
  getContent() {
    this.content = this.activePage.content;
    this.contentStatus.emit(this.activeContent);
    let jsonUrl = this.globalService.assetsurl + this.activePage.content[0].settings.url;
    this.sequencePath = this.getImagePath(this.activePage.content[0].settings.url)   

    this.lessonDataService
      .getJsonData(jsonUrl)
      .subscribe((data) => {
        this.sequence = data;
        this.sequenceToLoad = this.sequence.length;
        this.sequenceStartImg = this.sequence[Math.round((this.sequence.length / 100) * +this.activePage.content[0].settings.start_pos)]
        console.log('sequence', this.sequence);        
        this.getInitSizing();
        this.preloadImages(this.sequence, () => {
          this.sequenceLoadComplete = true;
          // console.log('this.rangeEl.nativeElement: ', this.rangeEl.nativeElement.offsetWidth)
          setTimeout(() => {
            this.rangeWidth =  this.rangeEl.nativeElement.offsetWidth;
            this.moveThumb(+this.activePage.content[0].settings.start_pos);
          }, 25);
          console.log('All images were loaded');
        });
      });
  }
  getImagePath(url){
    var the_arr = url.split('/');
    the_arr.pop();
    return( the_arr.join('/') )
  }
  getActiveContent() {

    this.activeContent.chars = this.content[0].content.heading;
    this.activeContent.chars += this.content[0].content.initial_text;
    this.activeContent.time = this.activePage.lockTime,
    this.activeContent.type = this.activeContent.type;
    console.error('this.activeContent: ', this.activeContent)
    this.contentStatus.emit(this.activeContent);
  }

  getInitSizing() {

    setTimeout(() => {
      this.getContentSize();
      this.getHeaderSize();
      this.sizeCanvas();
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

    console.log('Header Size: ', this.headerSize);
    console.log('Content Size: ', this.contentSize);
    console.log('Wrapper Size: ', this.wrapperSize);
    console.log('Canvas Size: ', this.canvasSize);


    if (this.canvasSize.x > this.canvasSize.y) {
      console.log('size width');
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
      console.log('size height');
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


}
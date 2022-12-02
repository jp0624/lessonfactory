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
import {NavigationService} from '../../../../../services/navigation.service';
import {LessonDataService} from '../../../../../services/lessondata.service';

@Component({
  selector: 'app-figurefigcaption',
  templateUrl: './figurefigcaption.component.html',
  styleUrls: ['./figurefigcaption.component.scss']
})
export class FigurefigcaptionComponent implements OnInit, AfterViewInit, AfterContentInit {
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

  private content = [];
  private contentId = 0;
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

  private subscription;

  private winSizeSubscription;

  constructor(private shellService: ShellService,
              private navigationService: NavigationService,
              private rd: Renderer2,
              private lessonDataService: LessonDataService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {

    if (this.lessonDataService.textDir === 'rtl') {
      this.isRtl = true;
    }

    this.getContent();
    this.getInitSizing();

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

  next() {
    console.log('MOVE TO NEXT FUNCTION CALLED');
  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  getContent() {
    this.content = this.activePage.content;
    this.getActiveContent();
  }

  getActiveContent() {
    console.error('this.contentId: ', this.contentId);
    console.warn('this.activePage: ', this.activePage);
    this.activeContent.chars = this.content[this.contentId].headings.heading;
    this.activeContent.chars += this.content[this.contentId].figcaption.text;
    this.activeContent.index = this.contentId + 1;
    this.activeContent.length = this.content.length;
    this.activeContent.time = this.activePage.lockTime,
      this.activeContent.type = this.activePage.lockType;

    this.contentStatus.emit(this.activeContent);
  }

  getInitSizing() {

    setTimeout(() => {
      this.getContentSize();
      this.getHeaderSize();

      if (this.activePage.pagecenter) {
        console.log('headerSize: ', this.headerSize);
        console.log('contentSize: ', this.contentSize);
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
  sizeCanvasX() {
    this.headerSize;
    this.contentSize;

    this.canvasSize = {
      x: this.wrapperSize.x/2,
      y: this.wrapperSize.y - this.headerSize.y
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

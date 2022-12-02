import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ShellService} from '../../../../../../services/shell.service';
import {LessonDataService} from '../../../../../../services/lessondata.service';

@Component({
  selector: 'app-slideshow-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  @Input()
  activePage;
  @Input()
  slideData;
  @Input()
  wrapperSize;

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
    x: 0.5625,
    y: 1.777777777777778
  };
  private initSized = false;
  private winSizeSubscription;

  constructor(private shellService: ShellService,
              private lessonDataService: LessonDataService) {
  }

  ngOnInit() {
    this.getInitSizing();

    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        this.getInitSizing();
      });
    console.log('=================================');
    console.log('activePage:', this.activePage);
    console.log('slideData:', this.slideData);
    console.log('=================================');
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
      x: this.wrapperSize.x, // /2,
      y: this.wrapperSize.y - this.headerSize.y - this.contentSize.y
      // y: this.wrapperSize.y - this.headerSize.y 
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

    // console.log('=================================');
    // console.log('headerSize: ', this.headerSize);
    // console.log('contentSize: ', this.contentSize);
    // console.log('canvasSize: ', this.canvasSize);
    // console.log('figureSize: ', this.figureSize);
    // console.log('=================================');
  }

}

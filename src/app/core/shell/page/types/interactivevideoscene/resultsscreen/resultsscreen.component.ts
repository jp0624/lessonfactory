import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ShellService} from '../../../../../../services/shell.service';
import {LessonDataService} from '../../../../../../services/lessondata.service';

@Component({
  selector: 'app-resultsscreen',
  templateUrl: './resultsscreen.component.html',
  styleUrls: ['./resultsscreen.component.scss']
})
export class ResultsscreenComponent implements OnInit {
  @Input()
  data;
  @Input()
  scoring;
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
    x: 0.4228515625,
    y: 2.364896073903002
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


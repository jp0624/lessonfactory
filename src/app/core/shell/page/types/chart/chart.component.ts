import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ShellService} from '../../../../../services/shell.service';
import {LessonDataService} from '../../../../../services/lessondata.service';
import {NavigationService} from '../../../../../services/navigation.service';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
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
  private winSizeSubscription;
  private activeScene: number = 0;
  private chart = {
    content: {
      heading: '',
      text: ''
    },
    settings: [],
    series: []
  };
  private subscription;

  constructor(private shellService: ShellService,
              private navigationService: NavigationService,
              private lessonDataService: LessonDataService,
              private rd: Renderer2) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {
    this.getChartData();
    this.getInitSizing();
    this.activeScene = 0;

    this.subscription = this.navigationService.nextClick
      .subscribe(event => {
        if (event === 'content') {
          this.next();
        }
      });

    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        this.getInitSizing();
      });
  }

  next() {
    console.log('this.activeScene: ', this.activeScene);
    this.activeScene++;
    this.getActiveContent();
  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
    this.subscription.unsubscribe();
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
  }

  getChartData() {
    let content = this.activePage.content;
    let markerCount;
    let markerMultiplier;

    Object.keys(content).forEach(key => {

      console.log('item[key]: ', content[key]);

      //this.questionData.push(content[key]);
      if ('headings' in content[key]) {

        this.chart.content = content[key].headings;

      } else if ('settings' in content[key]) {

        this.chart.settings = content[key].settings;
        markerCount = 100 / content[key].settings.measurement_marker;
        markerMultiplier = content[key].settings.measurement_marker;

      } else if ('item' in content[key]) {

        this.chart.series.push(content[key].item);

      }

    });
    this.chart.settings['markers'] = [];

    while (markerCount > 0) {
      let marker = markerMultiplier * markerCount--;
      this.chart.settings['markers'].push(marker);
    }

    this.chart.settings['type'] = 'bar-horz';
    this.chart.settings['animate'] = '1';
    this.chart.settings['animation-type'] = 'incremental';

    console.log('CHART: ', this.chart);
    this.getActiveContent();


  }

  getActiveContent() {
    console.error('this.activeScene: ', this.activeScene);
    console.warn('this.scenes[this.activeScene]: ', this.chart.content.heading);
    this.activeContent.chars = this.chart.content.heading;
    this.activeContent.chars += this.chart.content.text;
    this.activeContent.index = this.activeScene + 1;
    this.activeContent.length = 1;
    this.activeContent.time = this.activePage.lockTime;
    this.activeContent.type = this.activePage.lockType;

    this.contentStatus.emit(this.activeContent);
  }

}

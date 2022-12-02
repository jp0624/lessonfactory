import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ShellService} from '../../../../../services/shell.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../../../../services/navigation.service';
import {BandwidthService} from '../../../../../services/bandwidth.service';

@Component({
  selector: 'app-bandwidth',
  templateUrl: './bandwidth.component.html',
  styleUrls: ['./bandwidth.component.scss']
  , encapsulation: ViewEncapsulation.None
})
export class BandwidthComponent implements OnInit {
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
    x: 0.5625,
    y: 1.777777777777778
  };
  private winSizeSubscription;
  private formatSubscription;

  private componentData = {
    headings: {},
    settings: {},
    formats: []
  };

  private content = [];
  private contentId = 0;
  private activeContent = {
    'chars': '',
    'index': 0,
    'length': 0,
    'time': 10,
    'type': 'int-func'//'time-char'
  };

  private subscription;

  constructor(private shellService: ShellService,
              private http: HttpClient,
              private navigationService: NavigationService,
              private bandwidthService: BandwidthService) {
  }

  ngOnInit() {

    this.getFormatData();
    //this.bandwidthService.start()
    this.formatSubscription = this.bandwidthService.formatChange
      .subscribe(change => {

        console.log('BANDWIDTH FORMAT CHANGED: ', this.bandwidthService.bandwidthData.settings.activeFormat);

        if (this.bandwidthService.bandwidthData.settings.activeFormat >= 0 && this.activeContent.type !== 'time-char') {
          this.activeContent.type = 'time-char';
          this.getActiveContent();
        }

      });

    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        this.getInitSizing();
      });
  }

  getFormatData() {
    let content = this.activePage.content;

    Object.keys(content).forEach(key => {
      console.log('item[key]: ', content[key]);
      if ('format' in content[key]) {

        if (+content[key].format.enabled === 1) {
          this.componentData.formats.push(content[key].format);
        }
      } else if ('settings' in content[key]) {
        this.componentData.settings = content[key].settings;
        this.componentData.headings = content[key].headings;
      }
    });
    console.warn('this.componentData.formats: ', this.componentData.formats);
    console.warn('this.componentData.formats: ', this.componentData.formats);
    console.warn('this.componentData.formats: ', this.componentData.formats);
    console.warn('this.componentData.formats: ', this.componentData.formats);

    this.componentData.formats.sort(this.compare);

    this.getActiveContent();

    this.bandwidthService.start(this.componentData);

  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const thresholdA = +a.threshold;
    const thresholdB = +b.threshold;

    let comparison = 0;
    if (thresholdA > thresholdB) {
      comparison = 1;
    } else if (thresholdA < thresholdB) {
      comparison = -1;
    }
    console.log('comparison: ', comparison);
    return comparison;
  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
    this.formatSubscription.unsubscribe();
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

  getActiveContent() {
    console.log('this.activeContent: ', this.activeContent);
    console.log('this.contentId: ', this.contentId);
    console.log('this.content: ', this.content);

    this.activeContent.chars = 'abc';
    this.activeContent.index = this.contentId + 1;
    this.activeContent.length = this.content.length;
    this.activeContent.time = this.activeContent.time || 10;
    this.activeContent.type = this.activeContent.type;

    this.contentStatus.emit(this.activeContent);
  }

}

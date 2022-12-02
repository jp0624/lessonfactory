import {Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ShellService} from '../../../../services/shell.service';
import {NavigationService} from '../../../../services/navigation.service';
import {LessonDataService} from '../../../../services/lessondata.service';
import {DeviceService} from '../../../../services/device.service';
import {GlobalService} from '../../../../services/global.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-int1',
  templateUrl: './int1.component.html',
  styleUrls: ['./int1.component.scss']
})
export class TMM_Int1Component implements OnInit, OnDestroy {
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
  private subscription;

  private headerSize = {x: 0, y: 0};
  private canvasSize = {x: 0, y: 0};
  private contentSize = {x: 0, y: 0};
  private figureSize = {x: 0, y: 0};
  private videoSize = {x: 0, y: 0};
  private aspectRatio = {
    x: 0.5625,
    y: 1.777777777777778
  };
  private results;

  private values = {
    'percentageTimeSpeedMaintained': 1,

    'speedDeviationImperial': 2,
    'speedDeviationMetric': 2.1,
    'speedDeviationMetricEquivalent': 2.3,

    'distanceTravelledImperial': 3,
    'distanceTravelledMetric': 3.1,
    'distanceTravelledImperialEquivalent': 3.2,

    'timeToDial': 4
  };
  private registerComplete;
  private winSizeSubscription;
  private step: number = 0;
  private heading: string;
  private text: string;

  private displaySpeedometer: boolean = false;
  private displayPhone: boolean = false;
  private displayVideo: boolean = false;
  private goalReached: boolean = false;

  private maintainSpeed;
  private speedGoal;
  private speedVal;
  private endVideo;
  private videoPlay;
  private videoInit;

  private goaledSpeed: number = 40;

  private speedometerGoal = {
    units: 'MPH',
    goal: 40,
    min: 37,
    max: 45,
    multiplier: 4.38
  };
  private speedometerGoalImperial = {
    units: 'MPH',
    goal: 40,
    min: 37,
    max: 45,
    multiplier: 4.38
  };
  private speedometerGoalMetric = {
    units: 'KMH',
    goal: 60,
    min: 56,
    max: 67,
    multiplier: 2.88
  };


  constructor(private shellService: ShellService,
              private navigationService: NavigationService,
              private lessonDataService: LessonDataService,
              private rd: Renderer2,
              private deviceService: DeviceService,
              private globalService: GlobalService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //list resize functions
  }

  ngOnInit() {

    this.addInteractionListeners();

    this.getActiveContent();
    if (this.lessonDataService.isMetric && !this.lessonDataService.isImperial) {
      this.speedometerGoal = this.speedometerGoalMetric;

    } else if (!this.lessonDataService.isMetric && this.lessonDataService.isImperial) {
      this.speedometerGoal = this.speedometerGoalImperial;

    } else if (this.lessonDataService.isMetric && this.lessonDataService.isImperial) {
      this.speedometerGoal = this.speedometerGoalImperial;

    }

    this.getActiveContent();
    this.getInitSizing();
    this.heading = this.activePage.content[this.step].headings.heading || this.heading;

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

    this.next();
    this.activePage.content.push(this.activePage.content[0]);
  }

  addInteractionListeners() {
    //window.addEventListener("touchstart", this.startVideo
    window.addEventListener('keydown', this.onKeyDown, true);
  }

  onKeyDown = (evt) => {

    if (evt.keyCode === 32 && this.activePage.content[this.step].settings.video !== '0') {
      this.startVideo();
    }
  };

  startVideo() {
    this.videoPlay = true;
    this.videoInit = true;
  }

  touchDetected(event) {
    this.endVideo = true;
    // this.checkSpeed(event);
  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  videoComplete(event) {
    if (this.registerComplete) {
      return;
    }
    this.registerComplete = true;
    this.next();
  }

  updateSpeed(event) {
    this.speedVal = event;
    this.checkSpeed(event);
  }

  checkSpeed(event) {

    if (this.videoInit) {
      if (this.speedVal >= 20 && !this.videoPlay) {
        this.videoPlay = true;
      } else if (this.speedVal < 20 && this.videoPlay) {
        this.videoPlay = false;
      }
    }

  }

  updateMaintain(event) {
    this.maintainSpeed = event;

    if (event >= 99 && this.step === 3) {
      this.next();
    }

    $('.progress').css('transform', 'translateX(' + event + '%)');
  }

  updateSpeedGoal(event) {
    this.speedGoal = event;

    if (this.step === 2) {
      this.next();
    } else if (this.step === 6) {
      this.goalReached = true;
    }
  }

  numberEntered(event) {
    if (this.step === 6) {
      this.calculateResults();
      this.endVideo = true;
    } else if (this.step < this.activePage.content.length) {
      this.next();
    }
  }

  calculateResults() {

    this.activePage.content[this.step].settings.speedometer = '0';
    this.activePage.content[this.step].settings.phone = '0';

    this.results.distracted.end = (new Date()).getTime();
    this.results.distracted.total += (this.results.distracted.end - this.results.distracted.start);

    this.results.end = (new Date()).getTime();
    this.results.total = (this.results.end - this.results.start);


    this.results.distracted.precent = (100 - (100 / this.results.total * this.results.distracted.total));


    // this.results.distracted.precent = 100 - this.results.distracted.precent
    this.results.distracted.precent = Math.round(this.results.distracted.precent);


    this.results.deviated.total += this.results.deviated.top - 45;
    this.results.deviated.total += 37 - this.results.deviated.btm;
    this.results.deviated.total = Math.round(this.results.deviated.total * 10) / 10;

    if (this.results.deviated.total < 0) {
      this.results.deviated.total = this.results.deviated.total * -1;
    }
    if (this.results.distracted.precent < 0) {
      this.results.distracted.precent = this.results.distracted.precent * -1;
    }
    if (this.results.distracted.precent > 100) {
      this.results.distracted.precent = 100;
    }

    this.values.percentageTimeSpeedMaintained = this.results.distracted.precent;

    this.values.speedDeviationImperial = this.results.deviated.total;
    this.values.speedDeviationMetricEquivalent = Math.round(this.values.speedDeviationImperial * 1.60934);
    this.values.distanceTravelledImperial = Math.round(58.6 * (this.results.total * 0.001));

    this.values.speedDeviationMetric = this.results.deviated.total;
    this.values.distanceTravelledMetric = Math.round(58.6 * (this.results.total * 0.001) * 0.3048);
    this.values.distanceTravelledImperialEquivalent = Math.round(this.values.distanceTravelledMetric * 3.28084);

    this.values.timeToDial = Math.round(this.results.total * 0.001);

    this.updateResultData();
  }

  updateResults(event) {

    this.results = event;

    // "percentageTimeSpeedMaintained": 1,
    // "speedDeviationImperial": 2,
    // "distanceTravelledImperial": 3,
    // "timeToDial": 4

    // this.videoplayer.nativeElement.currentTime = 9.29;
    // this.videoplayer.nativeElement.play();

  }

  updateResultData() {
    this.activePage.content[7].result1.heading = this.replacePattern(this.activePage.content[7].result1.heading);
    this.activePage.content[7].result1.text = this.replacePattern(this.activePage.content[7].result1.text);

    this.activePage.content[7].result2.heading = this.replacePattern(this.activePage.content[7].result2.heading);
    this.activePage.content[7].result2.text = this.replacePattern(this.activePage.content[7].result2.text);

    this.activePage.content[7].result3.heading = this.replacePattern(this.activePage.content[7].result3.heading);
    this.activePage.content[7].result3.text = this.replacePattern(this.activePage.content[7].result3.text);

    // for (let i in results) {
    //   results[i].result = this.replacePattern(results[i].result);
    //   results[i].text = this.replacePattern(results[i].text);
    // }

  }

  replacePattern(string, values?) {
    // /((\{\$)\S*(\}))/g
    const regex = /([{$]\S*[}])/g;
    const matches = string.match(regex);
    values = values || this.values;

    for (let i in matches) {
      string = string.replace(matches[i], values[matches[i].replace(/[${}]/g, '')]);
    }
    return string;
  }

  next() {
    console.warn(this.activePage.content);

    if (this.step === 5) {
      this.startVideo();

      setTimeout(() => {
        this.videoPlay = false;
      });
    }

    this.step++;

    if (this.step === 6) {
      this.results = {};
    }
    this.heading = this.activePage.content[this.step].heading || this.heading;
    this.getActiveContent();
  }

  getActiveContent() {
    this.activeContent.chars = this.heading;

    if (this.activePage.content[this.step].figcaption) {
      this.activeContent.chars += this.activePage.content[this.step].figcaption.text;
    }
    if (this.activePage.content[this.step].headings.heading) {
      this.activeContent.chars += this.activePage.content[this.step].headings.heading;
    }
    if (this.activePage.content[this.step].result1) {
      this.activeContent.chars += this.activePage.content[this.step].result1.text;
    }
    if (this.activePage.content[this.step].result2) {
      this.activeContent.chars += this.activePage.content[this.step].result2.text;
    }
    if (this.activePage.content[this.step].result3) {
      this.activeContent.chars += this.activePage.content[this.step].result3.text;
    }
    this.activeContent.index = this.step + 1;
    this.activeContent.length = this.activePage.content.length;
    this.activeContent.time = this.activePage.lockTime;

    if (this.activePage.content[this.step].lock) {
      this.activeContent.type = this.activePage.content[this.step].lock.type;
    } else {
      this.activeContent.type = 'time-char';
    }

    this.contentStatus.emit(this.activeContent);
  }

  getInitSizing() {

    setTimeout(() => {
      this.getHeaderSize();
      this.sizeCanvas();
      this.sizeVideo();
    }, 50);
  }

  getHeaderSize() {
    this.headerSize = {
      x: this.headerEl.nativeElement.offsetWidth,
      y: this.headerEl.nativeElement.offsetHeight
    };
  }

  sizeVideo() {
    let winSize = {
      x: window.innerWidth,
      y: window.innerHeight
    };
    let ratio = {
      x: 0.5625,
      y: 1.777777777777778
    };
    let elWrapper = {
      x: winSize.y * ratio.y,
      y: winSize.x * ratio.x
    };
    if (elWrapper.y < winSize.y) {
      this.videoSize = {
        x: winSize.y * ratio.y,
        y: winSize.y
      };
    } else if (elWrapper.x < winSize.x) {
      this.videoSize = {
        x: winSize.x,
        y: winSize.x * ratio.x
      };
    } else {
      this.videoSize = {
        x: winSize.y * ratio.y,
        y: winSize.y
      };
    }
    ;
  }

  sizeCanvas() {
    this.headerSize;
    this.contentSize;

    this.canvasSize = {
      x: this.wrapperSize.x,
      y: this.wrapperSize.y - this.headerSize.y - this.contentSize.y
    };


    if (this.canvasSize.x > this.canvasSize.y) {

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


}

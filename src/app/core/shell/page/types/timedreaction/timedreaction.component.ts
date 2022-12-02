import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ShellService} from '../../../../../services/shell.service';
import {LessonDataService} from '../../../../../services/lessondata.service';
import {NavigationService} from '../../../../../services/navigation.service';
import {GlobalService} from '../../../../../services/global.service';
import {TimerService} from '../../../../../services/timer.service';

@Component({
  selector: 'app-timedreaction',
  templateUrl: './timedreaction.component.html',
  styleUrls: ['./timedreaction.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimedreactionComponent implements OnInit, OnDestroy {
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

  private componentData = {
    results: {
      content: '',
      averages: {
        time: 0,
        distance: 0,
        measure: 0
      },
      timing_text: '',
      distance_text: '',
      measure_text: ''
    },
    settings: {
      preload: 0
    },
    icons: {},
    video: {
      src: ''
    },
    prompts: {},
    attemptId: 0,
    attempts: [],
    totals: {}
  };

  private activeContent = {
    'chars': '',
    'index': 0,
    'length': 0,
    'time': 10,
    'type': 'func-int'
  };
  private values = {
    'measurementTotal': 0,
    'distanceImperial': 0,
    'distanceMetric': 0,
    'timeMilliseconds': 0
  };

  private videoSize = {x: 0, y: 0};
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
  private subscription;
  private vidPlay;
  private btnPlay;
  private videoPaused;
  private showPrompt = false;
  private showResults = false;
  private restartVid = false;
  private promptTimeout;
  private complete;
  private reactTimer;

  private componentDataLoaded;
  private activeReact = 1;
  private activeAttempt;
  private attemptsComplete = 0;

  private activePrompt;
  private startActive;
  private correctActive = false;
  private warnActive = false;
  private endActive = false;
  private allowReact;
  private reactActive;
  private setActive;

  private vidTime;
  private vidDuration;

  private _round(x, decimals = 2) {
    return Math.round(+x * 100) / 100;
  }

  constructor(private globalService: GlobalService,
              private shellService: ShellService,
              private navigationService: NavigationService,
              private lessonDataService: LessonDataService,
              private timerService: TimerService,
              private rd: Renderer2) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {
    this.activePage.display_next = 0;
    this.getActiveContent();
    this.getInitSizing();
    this.getComponentData();

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

    this.activePrompt = 'start';
    this.showPrompt = true;
  }

  next() {
    this.getActiveContent();
  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  videoTime(event) {
    if (!this.componentDataLoaded || this.vidTime === event) {
      return;
    }
    this.vidTime = event;

    if (this.vidTime >= this.activeAttempt.reacts[this.activeReact]) {
      if (this.allowReact && !this.reactActive) {
        this.activeAttempt.type = 'wrong';
        this.reactActive = true;
        if (this.activeReact + 1 === this.activeAttempt.reacts.length) {
          clearTimeout(this.promptTimeout);
          this.endActive = true;
          this.promptTimeout = setTimeout(() => {
            if (!this.showPrompt) {
              this.activePrompt = 'warn';
              this.showPrompt = true;
              this.warnActive = true;
            }
          }, 3000);

          this.reactTimer = this.timerService.curTime;
          console.log('SWITCH TO CORRECT');
          this.correctActive = true;
          this.activeAttempt.type = 'correct';
        } else if (this.activeReact < this.activeAttempt.reacts.length) {
          console.warn('HERE 1');
          this.activeReact++;
        } else if (this.activeReact > this.activeAttempt.reacts.length) {
          console.warn('HERE 2');
          this.activeReact = 0;
        }

        if (!this.correctActive) {
          setTimeout(() => {
            console.log('this.componentData.attempts:', this.componentData.attempts);
            this.reactActive = false;
            console.log('this.activeAttempt.reacts.length: ', this.componentData.attempts[this.componentData.attemptId].wrong);
            console.log('this.activeReact: ', this.activeReact);
          }, 3000);
        }
      }
    }
  }

  videoDetails(vidDur) {

    if (isNaN(vidDur)) {
      console.error('VID DYUR: ', vidDur);
    } else {
      console.error('VID DUR: ', vidDur);
      this.vidDuration = vidDur;
      this.startSet();
    }

  }

  videoComplete() {
  }

  startSet() {
    this.activePage.display_next = 0;
    this.correctActive = false;
    this.activeReact = 0;
    this.activeAttempt = this.componentData.attempts[this.componentData.attemptId];

    this.activeAttempt.type = 'wrong';
    this.activeAttempt.reacts = [];
    this.activeAttempt.reactsTotal = +this.activeAttempt.wrong;

    console.log('this.vidDuration: ', this.vidDuration);
    console.log('this.activeAttempt.start: ', this.activeAttempt.start);
    console.log('this.activeAttempt.reacts: ', this.activeAttempt.reacts);

    this.activeAttempt.interval = (this.vidDuration - +this.activeAttempt.start) / this.activeAttempt.reactsTotal;

    console.log('this.activeAttempt.reactsTotal: ', this.activeAttempt.reactsTotal + 1);

    for (let i = 0; i < this.activeAttempt.reactsTotal; i++) {
      console.log('IDX: ', i);
      console.log('+this.activeAttempt.start: ', +this.activeAttempt.start);
      console.log('+this.activeAttempt.interval: ', +this.activeAttempt.interval);
      let nextTime = +this.activeAttempt.start + (this.activeAttempt.interval * i);
      console.log('NEXT TIME: ', nextTime);
      this.activeAttempt.reacts.push(nextTime);

    }
    console.log('this.activeAttempt.reacts: ', this.activeAttempt.reacts);

    clearTimeout(this.promptTimeout);
    this.promptTimeout = setTimeout(() => {
      this.restartVid = false;
    }, 50);

    if (this.componentData.attemptId <= this.componentData.attempts.length) {
      this.setActive = true;
    }
  }

  reactStart() {
    if (!this.warnActive) {
      this.showPrompt = false;
    }

    this.vidPlay = true;
    this.allowReact = true;
  }

  reactDown() {
    this.startActive = true;
  }

  reactStop() {
    if (!this.startActive) {
      return;
    }

    this.startActive = false;
    this.allowReact = false;

    console.error('this.vidTime: ', this.vidTime);
    console.warn('this.componentData.attempts: ', this.componentData.attempts);
    console.warn('this.activeAttempt: ', this.activeAttempt);

    clearTimeout(this.promptTimeout);
    this.promptTimeout = setTimeout(() => {
      if (!this.correctActive && !this.startActive) {
        this.activePrompt = 'start';
        this.showPrompt = true;
        this.vidPlay = false;
      }
    }, 1000);
  }

  reactSubmit() {
    this.setActive = false;
    this.vidPlay = false;
    this.warnActive = false;
    this.endActive = false;

    if (this.reactActive && this.activeAttempt.type === 'correct') {

      this.reactActive = false;
      this.correctActive = false;
      this.activePrompt = 'start';

      this.calculateAttempt(this.componentData.attemptId);

      this.componentData.attemptId = this.componentData.attemptId + 1;

      this.showResults = true;
      this.getInitSizing();
      this.fillContent();

      if (this.componentData.attemptId >= this.componentData.attempts.length) {
        this.complete = true;

        this.activeContent.index = 2;
        this.activeContent.length = 1;
        this.activeContent.time = 50;
        this.activeContent.type = 'none';

        this.activePage.display_next = 1;
        this.componentData.results.content = this.replacePattern(this.componentData.results.content);

        this.contentStatus.emit(this.activeContent);

      }
    } else {
      this.reactActive = false;
      this.showPrompt = true;
      console.log('WRONG RESET');
      this.activePrompt = 'fail';

    }
  }

  calculateAttempt(idx) {

    let attemptValues = {
      'distanceImperial': 66,
      'distanceMetric': 66,
      'measurementTotal': 66,
      'timeMilliseconds': 66
    };

    let attempt = {
      time: this.componentData.results.timing_text,
      distance: this.componentData.results.distance_text,
      measure: this.componentData.results.measure_text
    };

    attemptValues.timeMilliseconds = this.timerService.curTime - this.reactTimer;
    attemptValues.timeMilliseconds = Math.round(attemptValues.timeMilliseconds);

    //miles / imperial
    attemptValues.distanceImperial = attemptValues.timeMilliseconds * 0.102667;
    //kilometers / metric
    attemptValues.distanceMetric = attemptValues.distanceImperial * 0.3048;

    const measureLength = 14;

    attemptValues.measurementTotal = attemptValues.distanceImperial / measureLength;
    Object.keys(attemptValues).forEach(k => {
      attemptValues[k] = this._round(attemptValues[k]);
    });

    this.componentData.attempts[idx].reactTime = this.replacePattern(attempt.time, attemptValues);
    this.componentData.attempts[idx].distanceUnit = this.replacePattern(attempt.distance, attemptValues);
    this.componentData.attempts[idx].measureUnit = this.replacePattern(attempt.measure, attemptValues);

    this.attemptsComplete++;

    Object.keys(this.values).forEach(k => {
      this.values[k] = this.values[k] * (this.attemptsComplete - 1) / this.attemptsComplete;
    });

    this.values.measurementTotal = this._round(this.values.measurementTotal + attemptValues.measurementTotal / this.attemptsComplete);
    this.values.distanceImperial = this._round(this.values.distanceImperial + attemptValues.distanceImperial / this.attemptsComplete);
    this.values.distanceMetric = this._round(this.values.distanceMetric + attemptValues.distanceMetric / this.attemptsComplete);
    this.values.timeMilliseconds = Math.round(this.values.timeMilliseconds + attemptValues.timeMilliseconds / this.attemptsComplete);
  }


  fillContent() {
    const content = {
      time: this.componentData.results.timing_text,
      distance: this.componentData.results.distance_text,
      measure: this.componentData.results.measure_text
    };

    this.componentData.results.averages.time = this.replacePattern(content.time);
    this.componentData.results.averages.distance = this.replacePattern(content.distance);
    this.componentData.results.averages.measure = this.replacePattern(content.measure);
  }

  tryAgain() {
    this.showResults = false;
    this.restartVid = true;
    this.getInitSizing();
    this.startSet();
  }

  getComponentData() {

    console.log('this.activePage.content: ', this.activePage.content);
    let content = this.activePage.content;

    Object.keys(content).forEach(key => {

      if ('video' in content[key]) {
        this.componentData.settings = content[key].settings;
        this.componentData.video = content[key].video;

      } else if ('prompts' in content[key]) {
        this.componentData.prompts = content[key].prompts;

      } else if ('results' in content[key]) {
        this.componentData.results = content[key].results;
        this.componentData.results.averages = {
          time: 0,
          distance: 0,
          measure: 0
        };

      } else if ('start_icon' in content[key]) {
        this.componentData.icons = content[key];

      } else if ('timing_set' in content[key]) {
        this.componentData.attempts.push(content[key].timing_set);
      }
      console.log('item[key]: ', content[key]);

    });
    console.log('COMPONENT DATA: ', this.componentData);
    this.componentDataLoaded = true;

  }

  getActiveContent() {
    console.log('this.activeContent.type: ', this.activeContent.type);
    this.contentStatus.emit(this.activeContent);
  }

  replacePattern(string, values?) {
    const regex = /([{$]\S*[}])/g;
    const matches = string.match(regex);
    values = values || this.values;

    for (let i in matches) {
      string = string.replace(matches[i], values[matches[i].replace(/[${}]/g, '')]);
    }
    return string;
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
  }

  getInitSizing() {
    clearTimeout(this.promptTimeout);
    this.promptTimeout = setTimeout(() => {
      this.getContentSize();
      this.getHeaderSize();
      this.sizeVideo();

      if (this.activePage.pagecenter) {
        this.sizeCanvas();
      }
    }, 50);
  }

  getContentSize() {
    if (this.showResults && this.complete === true) {
      this.contentSize = {
        x: this.contentEl.nativeElement.offsetWidth,
        y: this.contentEl.nativeElement.offsetHeight
      };
    } else {
      this.contentSize = {
        x: 0,
        y: 0
      };
    }
  }

  getHeaderSize() {
    if (this.showResults) {
      this.headerSize = {
        x: this.headerEl.nativeElement.offsetWidth,
        y: this.headerEl.nativeElement.offsetHeight
      };

    } else {
      this.headerSize = {
        x: 0,
        y: 0
      };
    }

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

    clearTimeout(this.promptTimeout);
    this.promptTimeout = setTimeout(() => {
      this.initSized = true;
    }, 50);
  }
}

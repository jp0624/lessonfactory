import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ShellService} from '../../../../../services/shell.service';
import {LessonDataService} from '../../../../../services/lessondata.service';
import {NavigationService} from '../../../../../services/navigation.service';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-videoassessment',
  templateUrl: './videoassessment.component.html',
  styleUrls: ['./videoassessment.component.scss']
})
export class VideoassessmentComponent implements OnInit, OnDestroy {
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
    'type': 'func-init'
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

  private videoSrc;
  private selected;
  private vidPlay;
  private btnPlay = true;

  private videoPaused;
  private displayQuestion;
  private activeQuestion: number = 0;

  private assessment = {
    videos: [],
    questions: [],
    markers: [],
    settings: {
      'markers': false,
      'pauseable': true
    }
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

    this.getAssessmentData();
    this.getInitSizing();

    this.videoSrc = this.assessment.videos[0].src;

    console.log('ASSESSMENT DATA: ', this.assessment);

    this.subscription = this.navigationService.nextClick
      .subscribe(event => {
        if (event === 'content') {
          this.next(event);
        }
      });

    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        this.getInitSizing();
      });
  }

  videoComplete(event) {
    this.next(event);
  }

  next(event, i?) {

    if (this.activeQuestion === this.assessment.questions.length) {
      this.lessonDataService.gotoTask(this.lessonDataService.activePageId + 1);
    } else {
      console.log('this.activeQuestion: ', this.activeQuestion);
      console.log('NEXT EVENT: ', event);
      console.log('NEXT i: ', i);


      if (+event.score === 0) {
        console.warn('WRONG ANSWER: ', i);
        this.assessment.markers[this.activeQuestion].status = 'wrong';

      } else {
        this.assessment.markers[this.activeQuestion].status = 'correct';
      }

      this.videoPaused = false;

      setTimeout(() => {
        this.displayQuestion = false;
        this.selected = -1;
        this.activeQuestion++;

        if (this.activeQuestion < this.assessment.questions.length) {
          this.getActiveContent();
        }
        this.vidPlay = true;

      }, 250);

    }
  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  changeSrc(src) {

    this.videoSrc = src;

  }

  videoTime(event) {
    // console.log('Cur time: ', event);
    // console.log('Pause at time:', +this.assessment.questions[this.activeQuestion].question.time);
    let curtime = event;
    if (this.displayQuestion || this.activeQuestion >= this.assessment.questions.length) {
      return;
    }
    if (curtime > +this.assessment.questions[this.activeQuestion].question.time) {
      console.log('PAUSE VIDEO');
      this.btnPlay = false;
      this.vidPlay = false;
      this.displayQuestion = true;
      setTimeout(() => {
        this.videoPaused = true;
      }, 250);
    }
    //console.log('VIDEO TIME: ', event);
    // this.next();
  }

  selectAnswer(event) {
    if (this.selected !== event) {
      this.selected = event;
    } else {
      this.selected = -1;
    }
    console.log('SELECTED ANSWER: ', event);
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

  getAssessmentData() {
    let content = this.activePage.content;

    Object.keys(content).forEach(key => {

      console.log('item[key]: ', content[key]);

      if ('video' in content[key]) {

        this.assessment.videos.push(content[key].video);

      } else if ('settings' in content[key]) {

        this.assessment.settings = content[key].settings;

      } else if ('question' in content[key]) {

        this.assessment.questions.push(content[key]);

      }

    });

    for (let idx in this.assessment.questions) {

      let tempStore = {
        question: '',
        answers: []
      };
      tempStore.question = this.assessment.questions[idx].question;

      let ans: number = 1;
      let max: number = 5;

      while (ans <= max) {
        tempStore.answers.push(this.assessment.questions[idx]['answer' + ans]);
        ++ans;
      }
      // tempStore.answers.push(this.assessment.questions[idx].answer1);
      // tempStore.answers.push(this.assessment.questions[idx].answer2);
      // tempStore.answers.push(this.assessment.questions[idx].answer3);
      // tempStore.answers.push(this.assessment.questions[idx].answer4);
      // tempStore.answers.push(this.assessment.questions[idx].answer5);
      this.assessment.questions[idx] = tempStore;

    }

    this.assessment.questions.sort(this.compare);

    if (this.assessment.settings.markers) {

      for (let question of this.assessment.questions) {
        console.log('QUESTION: ', question);
        let marker = {
          'time': question.question.time,
          'status': null
        };
        this.assessment.markers.push(marker);
      }

    }
    console.log('ASSESSMENT: ', this.assessment);
    this.getActiveContent();

  }

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const timeA = +a.question.time;
    const timeB = +b.question.time;

    let comparison = 0;
    if (timeA > timeB) {
      comparison = 1;
    } else if (timeA < timeB) {
      comparison = -1;
    }
    console.log('comparison: ', comparison);
    return comparison;
  }

  getActiveContent() {
    this.activeContent.chars = '';
    this.activeContent.index = this.activeQuestion + 1;
    this.activeContent.length = this.assessment.questions.length;
    this.activeContent.time = this.activePage.lockTime;
    this.activeContent.type = this.activePage.lockType;

    this.contentStatus.emit(this.activeContent);
  }

}

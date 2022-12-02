import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';

import {GlobalService} from '../../../../../services/global.service';
import {ShellService} from '../../../../../services/shell.service';
import {LessonDataService} from '../../../../../services/lessondata.service';
import {NavigationService} from '../../../../../services/navigation.service';
import {BookmarkService} from '../../../../../services/bookmark.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit, OnDestroy {
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

  private selected;

  private assessment = {
    questions: [],
    settings: {
      activeQuestion: 0,
      randomize: true
    }
  };
  private makingApiCall: Boolean;
  private subscription;

  constructor(private globalService: GlobalService,
              private shellService: ShellService,
              private navigationService: NavigationService,
              private lessonDataService: LessonDataService,
              private bookmarkService: BookmarkService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {

    this.getAssessmentData();
    // this.getInitSizing();

    console.log('ASSESSMENT DATA: ', this.assessment);

    this.subscription = this.navigationService.nextClick
      .subscribe(event => {
        if (event === 'content') {
          this.next(event);
        }
      });

    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        // this.getInitSizing();
      });
  }

  questionAnswered(event, i) {
    console.log('CHOSEN DATA: ' + i + ' ', event);
  }

  next(event, i?) {

    this.animating = true;
    setTimeout(() => {
      this.animating = false;
    }, 1000);

    console.log('this.activeQuestion: ', this.assessment.settings.activeQuestion);
    console.log('NEXT EVENT: ', event);
    console.log('NEXT i: ', i);

    setTimeout(() => {
      //this.selected = -1;
      this.assessment.settings.activeQuestion++;

      if (this.assessment.settings.activeQuestion < this.assessment.questions.length) {
        this.getActiveContent();
      } else {
        //ALL QUESTIONS ANSWERED
        let task_id = this.lessonDataService.dataLoaded[this.lessonDataService.activePageId].task_id;
        this.bookmarkService.writeBookmark(task_id);
      }

    }, 250);


  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
    this.subscription.unsubscribe();
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

      if ('settings' in content[key]) {

        this.assessment.settings = content[key].settings;

      } else if ('question' in content[key]) {
        content[key].question.id = +key;
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
      this.assessment.questions[idx] = tempStore;

    }

    this.assessment.questions.sort(this.globalService.compare);

    if (this.assessment.settings.randomize) {
      this.globalService.shuffle(this.assessment.questions);
    }

    console.log('ASSESSMENT: ', this.assessment);
    this.getActiveContent();

  }

  getActiveContent() {
    this.activeContent.chars = '';
    this.activeContent.index = this.assessment.settings.activeQuestion + 1;
    this.activeContent.length = this.assessment.questions.length;
    this.activeContent.time = this.activePage.lockTime;
    this.activeContent.type = this.activePage.lockType;

    this.contentStatus.emit(this.activeContent);
  }

}

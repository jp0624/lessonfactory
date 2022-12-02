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
import {BookmarkService} from '../../../../../services/bookmark.service';
import {TicketService} from '../../../../../services/ticket.service';
import {GlobalService} from '../../../../../services/global.service';

function _window(): any{
  return window;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, AfterViewInit, AfterContentInit {
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
  @HostBinding('class.rtl')
  isRtl: boolean = false;

  private bookmarkArray = [];
  private answersArray = [];
  private voidArray = {
    registration_id: this.ticketService.sessionData.registration_id,
    statement_ids: []
  };
  private componentData = {
    headings: {},
    messages: {},
    settings: {
      required: 0,
      passed: false
    },
    overall: {
      answers: null,
      total: null
    },
    categories: []
  };

  private contentId = 0;
  private activeContent = {
    'chars': 'abc',
    'index': 2,
    'length': 1,
    'time': 1000,
    'type': 'time-char'
  };

  private headerSize = {x: 0, y: 0};
  private canvasSize = {x: 0, y: 0};
  private contentSize = {x: 0, y: 0};
  private figureSize = {x: 0, y: 0};
  private aspectRatio = {
    x: 0.4175824175824176,
    y: 2.394736842105263
    // x: 0.5625,
    // y: 1.777777777777778
  };
  //1820 x 760
  private subscription;
  private bookmarkSubscription;
  private initBookmarkDataLoaded;
  private answerDataLoaded;
  private winSizeSubscription;

  constructor(private shellService: ShellService,
              private navigationService: NavigationService,
              private rd: Renderer2,
              private lessonDataService: LessonDataService,
              private bookmarkService: BookmarkService,
              private ticketService: TicketService,
              private globalService: GlobalService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {
    this.lessonDataService.loading = true;
    if (this.lessonDataService.textDir === 'rtl') {
      this.isRtl = true;
    }
    //SCORM User disable the next button start
    if (this.lessonDataService.scorm) {
      this.lessonDataService.activePage.display_next = 0;
    }
    //SCORM User disable the next button end

    this.getComponentData();
    this.getInitSizing();
    // this.contentStatus.emit(this.activeContent);

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

    this.bookmarkSubscription = this.bookmarkService.bookmarkDataReceived
      .subscribe(event => {
        if (event === true && !this.initBookmarkDataLoaded) {
          console.log('CURRENTLY SEARCHING FOR INITIAL BOOKMARKS');

        } else if (event === false && !this.initBookmarkDataLoaded) {
          console.log('BOOOOM WE GOT THE DATA FOR THE INITIAL LOAD!');
          this.initBookmarkDataLoaded = true;
          this.lessonDataService.loading = true;
          this.getBookmarkData();

        } else if (event === true) {
          console.log('CURRENTLY SEARCHING FOR INITIAL BOOKMARKS');

        } else if (event === false) {
          console.log('BOOOOM WE GOT THE SECOND ROUND OF BOOKMARKS');

        }
      });
  }

  ngAfterViewInit() {
  }

  ngAfterContentInit() {
  }

  next() {
    console.log('MOVE TO NEXT CONTENT FUNCTION CALLED');
  }

  getComponentData() {

    let content = this.activePage.content;
    console.log('CONTENT: ', content);

    Object.keys(content).forEach(key => {

      console.log('item[key]: ', content[key]);

      if ('settings' in content[key]) {

        this.componentData.settings = content[key].settings;
        this.componentData.messages = content[key].messages;
        this.componentData.headings = content[key].headings;

      } else if ('category' in content[key]) {
        content[key].category.answers = 0;
        content[key].category.total = 0;
        this.componentData.categories.push(content[key].category);

      }

    });
    console.error('this.componentData.categories: ', this.componentData.categories);
    // this.getLocalAnswerData();

  }

  getActiveContent() {
    console.error('this.contentId: ', this.contentId);
    console.warn('this.activePage: ', this.activePage);

    this.activeContent.chars = 'abc';
    this.activeContent.index = this.contentId + 1;
    this.activeContent.length = 1;
    this.activeContent.time = this.activePage.lockTime,
      this.activeContent.type = this.activePage.lockType;
    console.warn('this.activeContent: ', this.activeContent);
    this.contentStatus.emit(this.activeContent);

  }


  clearQuestionBookmarks() {
    this.lessonDataService.loading = true;
    this.bookmarkService.postLessonComplete().subscribe(() => {
      this.bookmarkService.sessionBookmarks = [];
      this.voidArray.statement_ids = [];

      for (const answer of this.answersArray) {

        for (const bookmark of this.bookmarkArray) {

          // void all
          // this.voidArray.statement_ids.push(bookmark.bookmark_statement_id)

          if (+bookmark.task_id === +answer.task_id) {

            for (let task of this.lessonDataService.dataLoaded) {

              if (+answer.task_id === task.task_id) {
                this.voidArray.statement_ids.push(bookmark.bookmark_statement_id);

                console.log('  ');
                console.log('================================');
                console.log('TASK ID: ', task.task_id);
                console.log('TASK complete: ', task.complete);
                console.log('Change to false!');
                task.complete = false;
                console.log('TASK complete: ', task.complete);
                console.log('TASK: ', task);
                console.log('  ');
                console.log('answer ID: ', answer.task_id);
                console.log('answer: ', answer);
                console.log('bookmark ID: ', bookmark.task_id);
                console.log('STATEMENT: ', bookmark.bookmark_statement_id);
                console.log('================================');

                // break lessonArr;
              }
            }

            // break bookmarkArr;
          }

        }
        // break answerArr;

      }
      console.error('this.lessonDataService.dataLoaded: ', this.lessonDataService.dataLoaded);
      console.error('this.voidArray:', this.voidArray);
      this.voidBookmarks();
    });
  }

  voidBookmarks() {
    this.bookmarkService.clearQuestionBookmarks(this.voidArray)
      .subscribe(
        (data) => {
          console.warn('VOID BOOKMARK RESULTS: ', data);

          this.bookmarkService.resetStorage();
          this.bookmarkService.sessionBookmarks = [];
          this.bookmarkService.storedBookmarks = [];

          setTimeout(() => {
            this.bookmarkService.initBookmarkData();
          }, 2500);

        },
        (err) => {
          // this.parseBookmarks();
          console.warn('VOID BOOKMARK ERROR: ', err);

        }
      );
  }

  getBookmarkData() {

    this.bookmarkService.getBookmarkData()
      .subscribe(
        (data) => {
          this.bookmarkArray = [];

          for (let bookmark of data) {
            // console.log('BOOKMARK RECEIVED: ', bookmark);
            this.bookmarkArray.push(bookmark);
          }

          this.getAnswerData();

        },
        (err) => {
          if (err.status == 404) {
            console.log(err.message);
            this.getAnswerData();
          } else {
          }

        }
      );
  }

  getAnswerData() {
    this.bookmarkService.getAnswerData()
      .subscribe(
        (data) => {
          console.log('ANSWER DATA LOADED: ', data);
          console.log('ANSWER DATA LOADED: ', data);
          console.log('ANSWER DATA LOADED: ', data);
          console.log('ANSWER DATA LOADED: ', data);
          this.parseAnswerData(data);
          this.answerDataLoaded = true;
          this.lessonDataService.loading = false;
        },
        (err) => {
          if (err.status == 404) {
            console.log(err.message);
            this.answerDataLoaded = true;
            this.lessonDataService.loading = false;
          } else {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET Answer ERROR: ', err);
          }
        }
      );
  }
/*
  getLocalAnswerData() {

    //let url = `assets/json/db-${params.lesson_id}.json`
    let url = `${this.globalService.assetsurl}/media/temp/getanserresults.json`;
    this.lessonDataService.getJsonData(url)
      .subscribe(
        (data) => {
          this.parseAnswerData(data);
        },
        (err) => {
          if (err.status == 404) {
            console.log(err.message);
          } else {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET Answer ERROR: ', err);
          }

        }
      );
  }*/

  parseAnswerData(data) {
      for (let answer of data) {    
      if (this.componentData.categories.length) {

        for (let category of this.componentData.categories) {
          if (category.code === answer.category) {

            ++this.componentData.overall.answers;
            this.componentData.overall.total += +answer.score;
            this.answersArray.push(answer);

            category.total += +answer.score;
            ++category.answers;
          }
        }
      } else {

        ++this.componentData.overall.answers;
        this.componentData.overall.total += +answer.score;
        // sessionStorage.getItem('version_code')
        if (this.ticketService.sessionData.version_code) { 
          this.componentData.overall.total = 100;
        }
        this.answersArray.push(answer);

      }

      // this.componentData.categories[0].total
      // this.componentData.categories[0].answers
    }
    // this.componentData.settings.passed
    // this.componentData.settings.required === 2
    if (+this.componentData.settings.required === 1 && ((100 / (this.componentData.overall.answers * 100)) * this.componentData.overall.total) >= +this.ticketService.sessionData.pass_mark) {
      this.componentData.settings.passed = true;      
      setTimeout(() => {
        console.warn('Emit passed!');
        this.contentStatus.emit(this.activeContent);
      }, 1250);
    }
  //SCORM post message condition handled start
if (this.lessonDataService.scorm) {
    let jsonScore: any = (100 / (this.componentData.overall.answers * 100)) * this.componentData.overall.total;
    let jsonStatus: string;
      if (jsonScore >= this.ticketService.sessionData.pass_mark) {
          jsonStatus = 'passed';
      } else if (jsonScore <= this.ticketService.sessionData.pass_mark){
          jsonStatus = 'failed';
      } else {
          jsonStatus = 'completed';
      }
        let compscores = new Array();
        if (this.componentData.categories.length) {      
          for (let addJson of this.componentData.categories) {
          let x = (100/(addJson.answers*100))*addJson.total;
            compscores.push({'comp': addJson.code,'score':x.toFixed(2)})
          }
        }
        let jsonMsg = {
          'srcFrom'    : 'Lesson',
          'username'   : sessionStorage.getItem('user_id'),
          'status'     : jsonStatus,
          'passmark'   : sessionStorage.getItem('pass_mark'),
          'score'      : jsonScore.toFixed(2),
          'compscores' :  compscores    
        };
        if (!this.componentData.categories.length) {
          delete jsonMsg['compscores'];
        }
        this.bookmarkService.postLessonComplete();
      if( _window().self !==  _window().parent) {
            if ( _window().parent) {
                console.log('post to parent===>',jsonMsg);
                _window().parent.postMessage(jsonMsg, '*'); // I’m in an iFrame post to parent
            }
          } else {
            if ( _window().opener) {
              console.log('post to opener===>',jsonMsg);
                _window().opener.postMessage(jsonMsg, '*'); // I’m NOT in an iFrame (new window/tab) so post to my opener
            }
        }
      } 
     //SCORM  post message condition handled end
    this.getActiveContent();
  }


  getInitSizing() {

    setTimeout(() => {
      this.getContentSize();
      this.getHeaderSize();

      if (this.activePage.pagecenter) {
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

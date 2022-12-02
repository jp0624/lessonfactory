import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ShellService} from '../../../../../services/shell.service';
import {LessonDataService} from '../../../../../services/lessondata.service';
import {NavigationService} from '../../../../../services/navigation.service';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';
import {TimerService} from '../../../../../services/timer.service';
import {GlobalService} from '../../../../../services/global.service';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.scss'],
  providers: []
})
export class TheatreComponent implements OnInit, OnDestroy {
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
    chars: '',
    index: 0,
    length: 0,
    time: 10,
    type: 'time-char'
  };

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
  private activeScene: number = 0;
  private stage;
  private scenes: Array<any> = [];
  private subscription;
  private timeSubscription;

  private lockStartTime;
  private lockEndTime

  private buttons: Array<any> = [];
  private lockButtons = true;
  private leftPosi;

  constructor(private shellService: ShellService,
              private navigationService: NavigationService,
              private lessonDataService: LessonDataService,
              private timerService: TimerService,
              private globalService: GlobalService,
              private rd: Renderer2) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {
    this.getSceneData();
    this.getInitSizing();

    if(this.buttons.length){
      this.activePage.display_next = 0;

      this.timeSubscription = this.timerService.timeChange
        .subscribe(change => {
          if( this.timerService.curTime > this.lockEndTime){
            this.lockButtons = false;
            return;
          }
          let curLockTime = this.timerService.curTime - this.lockStartTime;
  
          this.leftPosi = (100 / (this.lockEndTime - this.lockStartTime)) * curLockTime;
          console.log('this.leftPosi: ', this.leftPosi)
  
        });
    }
    
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
    this.getInitSizing();
  }
  setLockTime(){

    this.lockStartTime = this.timerService.curTime;
    this.lockEndTime = this.lockStartTime + (this.activeContent.chars.length * this.activeContent.time);
    console.log('this.activeContent.chars: ', this.activeContent.chars.length);
    console.log('this.lockStartTime: ', this.lockStartTime)
    console.log('this.lockEndTime: ', this.lockEndTime)
    console.log('LOCK TIME: ', this.lockEndTime - this.lockStartTime)

  }

  buttonClick(button){
    if(this.lockButtons){
      return;
    }
    this.lockButtons = true;
    button.viewed = true;
    this.changeScene(button.index);
  }

  changeScene(index){
    console.log('this.buttons: ', this.buttons);
    this.activeScene = index;
    this.getActiveContent();
    this.getInitSizing();
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
    setTimeout(() => {
      this.initSized = true;
    }, 50);
  }

  getSceneData() {
    let content = this.activePage.content;

    Object.keys(content).forEach(key => {

      console.log('item[key]: ', content[key]);

      //this.questionData.push(content[key]);
      if ('stage' in content[key]) {
        console.log('Found Stage: ', key);
        this.stage = content[key].stage;
         const regex = /((\{\$dt-)\S*(\}))/g;
         const matches = this.stage.html.match(regex);
          for (let i in matches) {
            if (matches[i] === '{$dt-mediaUrl}') {
              this.stage.html = this.stage.html.replace(matches[i], this.globalService.assetsurl);
            }
          }
      } else if ('scene' in content[key]) {

        console.log('Found scene: ', key);
        this.scenes.push(content[key].scene);

      } else if('button' in content[key]){
        this.buttons.push(content[key].button);
      }

    });
    this.getActiveContent();
    console.log('STAGE: ', this.stage);
    console.log('SCENES: ', this.scenes);
    console.log('BUTTONS: ', this.buttons);


  }

  getActiveContent() {
    console.error('this.activeScene: ', this.activeScene);
    console.warn('this.scenes[this.activeScene]: ', this.scenes[this.activeScene]);

    this.activeContent.chars = this.scenes[this.activeScene].heading;
    this.activeContent.chars += this.scenes[this.activeScene].text;

    if(this.buttons.length){
      let viewedButtons = 0;

      for(let button of this.buttons){
        if(button.viewed){
          ++viewedButtons;
        }
      }
      if(viewedButtons === this.buttons.length){
        this.activePage.display_next = 1;
        console.log('ALL BUTTONS HAVE BEEN CLICKED');
        this.activeContent.index = this.scenes.length + 1;
        this.activeContent.type = 'time-char';
      } else {
        console.log('BUTTONS CLICKED: ', viewedButtons);
        console.log('BUTTONS TOTAL: ', this.buttons.length);
      }

    } else {
      this.activeContent.type = this.activePage.lockType; //'time-char';
      this.activeContent.index = this.activeScene + 1;
    }
    console.log('this.activeContent.index: ', this.activeContent.index)
    
    //this.activeContent.chars
    this.activeContent.length = this.scenes.length;
    this.activeContent.time = this.activePage.lockTime;
    // this.activeContent.type = this.scenes[this.activeScene].lockType;

    this.scenes[this.activeScene].viewed = true;

    console.log('this.activeContent.type: ', this.activeContent.type);
    this.setLockTime();
    this.contentStatus.emit(this.activeContent);
  }
}

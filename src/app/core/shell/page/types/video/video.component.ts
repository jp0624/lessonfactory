import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {ShellService} from '../../../../../services/shell.service';
import {ParamsService} from '../../../../../services/params.service';
import {GlobalService} from '../../../../../services/global.service';
import {LessonDataService} from '../../../../../services/lessondata.service';
import {BookmarkService} from '../../../../../services/bookmark.service';
@Component({
  selector: 'app-videopage',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideopageComponent implements OnInit, AfterContentInit {
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
    // "type": "time-char"
    'type': 'video-complete'
  };
  public componentData = {
    settings: [],
    video: [],
    icons: [],
    content: {
      heading: '',
      text: ''
    },
    in: '',
    out: '',
    linked_questions: '',
    questionData: []
  };
  private videoData = {
    'playing': false
  };
  private registerComplete;
  private controls = true;
  private timeline = true;
  private theme = 'none';
  private headerSize = {x: 0, y: 0};
  private canvasSize = {x: 0, y: 0};
  private contentSize = {x: 0, y: 0};
  private figureSize = {x: 0, y: 0};
  private aspectRatio = {
    x: 0.5625,
    y: 1.777777777777778
  };
  public essentialLoop;
  public show: boolean = false;
  private essentialLinkedQuestions = [];
  private essentialBreak = [];
  private winSizeSubscription;
  private essentialBreakAssign;
  constructor(private shellService: ShellService,
              private paramsService: ParamsService,
              private rd: Renderer2, 
              private lessonDataService: LessonDataService,
              private globalService: GlobalService, private bookmarkService: BookmarkService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {

    // if(this.activePage.content[0].settings){
    //   this.controls = +this.activePage.content[0].settings.controls !== 1 ? true : false;
    //   this.timeline = +this.activePage.content[0].settings.timeline !== 1 ? true : false;
    //   this.theme = this.activePage.content[0].settings.theme ? this.activePage.content[0].settings.theme : 'none';
    // }
   
    if (this.paramsService.paramData.initType === 'local'
      || this.paramsService.paramData.initType === 'preview') {
      console.log('preview or local video mode');
     
      // this.activeContent.type = "none"
    }
    this.contentStatus.emit(this.activeContent);
    this.getInitSizing();
    this.getComponentData();

    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        this.getInitSizing();
      });

    //do this on vid complete
   
  }
  formatTimeExpressAndEssential(timeFormat:any): any {      
    var timeArray = new Array();
    timeArray     = timeFormat.split(/;|,|:/);
    //console.log(timeArray);
    var seconds;
      if (timeArray.length == 4) 
         seconds = timeArray[0] * 3600 +  timeArray[1] * 60 +  parseInt(timeArray[2]) + '.' + timeArray[3];
      if (timeArray.length == 3) 
         seconds = timeArray[0] * 60 +  parseInt(timeArray[1]) + '.' + timeArray[2];
      if (timeArray.length == 2)
          seconds = timeArray[0] + '.' + timeArray[1];
        //console.log('seconds.milliseconds', seconds);
        return seconds;
  }

  getComponentData() {
    let content = this.activePage.content;
    console.log('content:', content);

    Object.keys(content).forEach(key => {
      
      //console.log('item[key]: ', content[key]);

      if ('icon' in content[key]) {
        this.componentData.icons.push(content[key]);
      }
      if ('video' in content[key]) {
        this.componentData.video = content[key].video;
        // Condition handled to display the low bandwidth video if it is available
        if (this.componentData.video['480'])
          this.componentData.video['src'] = this.componentData.video['480'];
      }
      if ('settings' in content[key]) {
        this.componentData.settings = content[key].settings;
        console.log('this.componentData.video', this.componentData.settings);
        // For express module disable progress bar:      
        if (sessionStorage.getItem('version_code') && sessionStorage.getItem('version_code').includes("EX")) {
           this.componentData.settings['timeline'] = false;
        }
      }
      if ('figcaption' in content[key]) {
        this.componentData.content.text = content[key].figcaption.text;
      }
      if ('headings' in content[key]) {
        this.componentData.content.heading = content[key].headings.heading;
      }     
      // express getting values start
      if ('express' in content[key]) {
        this.componentData.in = this.formatTimeExpressAndEssential(content[key].express.in);
        this.componentData.out = this.formatTimeExpressAndEssential(content[key].express.out);
        this.componentData.linked_questions = content[key].express.linked_questions;
        this.componentData.questionData = content[key].questions;
      }    
      // express getting values end
      // essential start
      if ('essential' in content[key]) {
        this.essentialLinkedQuestions = new Array();
        this.essentialBreak = new Array();
        for (var i = 0;i<content[key]['essential'].length;i++) { 
          this.essentialLinkedQuestions.push(content[key]['essential'][i]['linked_questions']);
          this.essentialBreak.push(this.formatTimeExpressAndEssential(content[key]['essential'][i]['essential_break']));
       }
          this.componentData.questionData = content[key].questions;
      }
      // essential end
    });
 
    if(localStorage.getItem('video-essentialbreak')) {
      let item = JSON.parse(localStorage.getItem('video-essentialbreak'))
      this.essentialLoop = item.loop;
      this.essentialBreakAssign = this.essentialBreak[item.loop];    
      console.log('this.essentialBreakAssignthis.essentialBreakAssign', this.essentialBreakAssign);  
    } else {
      this.essentialBreakAssign = this.essentialBreak[0];
    }   
    console.log('this.componentData:', this.componentData);
  }

  videoComplete(event) {

    if (this.registerComplete) {
      return;
    }
    this.registerComplete = true;
    console.log('VIDEO COMPLETE int1: ', event);
     //Remove BookMark for Essential Video for breaks
     if (localStorage.getItem("video-essentialbreak")) {
       console.log('coming inside clear the video-essentialbreak');
      localStorage.removeItem("video-essentialbreak");
    }
    this.activeContent.type = 'none';
    this.contentStatus.emit(this.activeContent);
    // this.next();   
  }
  // express event start
  expressPopup(event) {
    console.log('Express Video COMPLETE int1: ', event);
    this.show = true; 
  }
  expressEvent(event) {
     this.show = false;
    if (event == 100) {
      let task_id = this.lessonDataService.dataLoaded[this.lessonDataService.activePageId].task_id;
      this.bookmarkService.writeBookmark(task_id);
       this.lessonDataService.gotoTask(this.activePageId + 1)
       //this.activeContent.type = 'none';
       //this.contentStatus.emit(this.activeContent);
     }
  }
// express event end
// essential event start
  essentialPopup(event) {
    console.log('Essential Video Break int1: ', event);
    this.show = true;
    this.essentialLoop = event;
  }
  essentialEvent(event) {
    console.log('Essential question iteration event: ', event);
    this.show = false;
    this.essentialBreakAssign = this.essentialBreak[event];
    console.log(this.essentialBreakAssign);
    //Set BookMark for Essential Video for breaks
      if (this.essentialBreakAssign) {
        let endTime = this.essentialBreak[event + 1];
        let iSecond =  parseFloat(this.essentialBreak[event]) + 1.0;
        console.log('event ======================>', event);
        if (this.essentialBreak.length == (event + 1)) {
          localStorage.removeItem("video-essentialbreak");
        } else {
          let myObj = {'startTime' : iSecond,'endTime': parseFloat(endTime),'loop' : event};
          localStorage.setItem('video-essentialbreak', JSON.stringify(myObj));
        }         
      }
   }
// essential event end
  playVid() {
    this.videoData.playing = true;
  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
  }

  // getComponentData() {
  //   let content = this.activePage.content
  //   Object.keys(content).forEach(key => {
  //     console.log('item[key]: ', content[key]);
  //     //this.questionData.push(content[key]);
  //     if ('settings' in content[key]) {
  //         console.log('Found Settings: ', key);
  //         this.componentData.settings = content[key].settings;
  //     } else if ('video' in content[key]) {
  //       console.log('Found slide: ', key);
  //       this.componentData.video.push(content[key]);
  //     }
  //   });
  //   console.log('this.componentData:', this.componentData);
  // }

  getInitSizing() {

    setTimeout(() => {
      this.getContentSize();
      this.getHeaderSize();

      if (this.activePage.pagecenter) {
        console.log('headerSize: ', this.headerSize);
        console.log('contentSize: ', this.contentSize);
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

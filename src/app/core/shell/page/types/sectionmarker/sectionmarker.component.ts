import {Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

import {Router} from '@angular/router';

import {ShellService} from '../../../../../services/shell.service';
import {NavigationService} from '../../../../../services/navigation.service';
import {LessonDataService} from '../../../../../services/lessondata.service';

@Component({
  selector: 'app-sectionmarker',
  templateUrl: './sectionmarker.component.html',
  styleUrls: ['./sectionmarker.component.scss']
})
export class SectionmarkerComponent implements OnInit {
  @Input()
  activePage;
  @Input()
  activePageId;
  @Input()
  wrapperSize;

  @Output()
  contentStatus: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.rtl') isRtl: boolean = false;

  @ViewChild('header')
  headerEl: ElementRef;
  @ViewChild('canvas')
  canvasEl: ElementRef;
  @ViewChild('content')
  contentEl: ElementRef;

  private content = [];
  private contentId = 0;
  private activeContent = {
    'chars': '',
    'index': 0,
    'length': 0,
    'time': 10,
    'type': 'time-char',
    'markers': [],
    'src': '',
    'content': ''
  };

  private headerSize = {x: 0, y: 0};
  private canvasSize = {x: 0, y: 0};
  private contentSize = {x: 0, y: 0};
  private figureSize = {x: 0, y: 0};
  private aspectRatio = {
    x: 0.5625,
    y: 1.777777777777778
  };

  private subscription;

  private winSizeSubscription;

  constructor(private shellService: ShellService,
              private navigationService: NavigationService,
              private rd: Renderer2,
              private router: Router,
              private lessonDataService: LessonDataService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {

    if (this.lessonDataService.textDir === 'rtl') {
      this.isRtl = true;
    }

    this.getMarkerData();
    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        this.getInitSizing();
      });

  }

  getMarkerData() {
    let content = this.activePage.content;

    Object.keys(content).forEach(key => {

      console.log('item[key]: ', content[key]);

      if ('marker' in content[key]) {

        console.log('Found Markers: ', key);
        this.activeContent.chars += content[key].title;
        this.activeContent.markers.push(content[key]);

      } else if ('figcaption' in content[key]) {

        console.log('Found content: ', key);
        this.activeContent.content = content[key];
        this.activeContent.chars += content[key].figcaption;

      }

    });

    console.log('this.activeContent: ', this.activeContent);
    this.activeContent.index = this.contentId + 1;
    this.activeContent.length = this.content.length;
    this.activeContent.time = this.activePage.lockTime,
      this.activeContent.type = this.activePage.lockType;
    this.contentStatus.emit(this.activeContent);

  }

  sectionLink(section) {
    console.warn('SECTION CHANGE TO: ', section);
    console.error('ROUTER: ', this.router);
    this.lessonDataService.gotoTask(section);
    //this.router.navigate(['/' + section], {replaceUrl: true});
  }

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

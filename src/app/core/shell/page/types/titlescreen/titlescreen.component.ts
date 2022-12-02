import {AfterContentChecked, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {ShellService} from '../../../../../services/shell.service';
import {LessonDataService} from '../../../../../services/lessondata.service';
import {DictionaryService} from '../../../../../services/dictionary.service';

@Component({
  selector: 'app-titlescreen',
  templateUrl: './titlescreen.component.html',
  styleUrls: ['./titlescreen.component.scss']
})
export class TitlescreenComponent implements OnInit, OnDestroy, AfterContentChecked {

  @Input()
  activePage;
  @Input()
  activePageId;

  @Output()
  contentStatus: EventEmitter<any> = new EventEmitter();

  private chars25: boolean;
  private winSizeSubscription;

  private figureSize = {
    x: 0,
    y: 0
  };
  private dictionaryCycle;

  constructor(private dictionaryService: DictionaryService,
              private shellService: ShellService,
              private lessonDataService: LessonDataService) {
  }

  ngOnInit() {
    let btns = {
      continue: '{$dt-continue}'
      //continue: this.activePage.dictionary[0].value
    };
    this.activePage.content[0].btns = btns;

    if (this.activePage.content[0].headings.heading) {
      this.chars25 = this.activePage.content[0].headings.heading.length > 25 ? true : false;
    }
    this.sizeFigure();
    console.log('THIS COMPONENT: ', this);

    this.winSizeSubscription = this.shellService.winSizeChange
      .subscribe(change => {
        this.sizeFigure();
        console.log('this.shellService.window: ', this.shellService.window);
      });
  }

  ngOnDestroy() {
    this.winSizeSubscription.unsubscribe();
  }

  ngAfterContentChecked() {

    if (this.activePage.content && this.activePage.dictionary && !this.dictionaryCycle) {
      this.dictionaryCycle = true;
      console.log('find dictionary terms cycle again');
      this.dictionaryService.findDictionaryTerms(this.activePage.content, this.activePage.dictionary);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sizeFigure();
  }

  sizeFigure() {
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
      this.figureSize = {
        x: winSize.y * ratio.y,
        y: winSize.y
      };
    } else if (elWrapper.x < winSize.x) {
      this.figureSize = {
        x: winSize.x,
        y: winSize.x * ratio.x
      };
    } else {
      this.figureSize = {
        x: winSize.y * ratio.y,
        y: winSize.y
      };
    }
    ;
  }
}

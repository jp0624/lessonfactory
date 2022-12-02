import {HostListener, Injectable} from '@angular/core';
import * as $ from 'jquery';

import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ShellService {
  mainNav = {
    status: false
  };
  window = {
    x: window.innerWidth,
    y: window.innerHeight
  };
  private winSizeChangeInit = new BehaviorSubject<number>(0);
  winSizeChange = this.winSizeChangeInit.asObservable();

  constructor() {
  }

  toggleMainNav(value: string, delay: boolean = false) {
    if (value === 'toggle') {
      if (!delay) {
        this.mainNav.status = this.mainNav.status === false;
      } else if (delay === true) {
        setTimeout(() => {
          this.mainNav.status = this.mainNav.status === false;
        }, 500);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('WINDOW RESIZE');
    this.getWindowSize();
  }

  emitWinSizeChangeTask(toggle) {
    this.winSizeChangeInit.next(toggle);
  }

  getWindowSize() {
    this.window = {
      x: window.innerWidth,
      y: window.innerHeight
    };
    this.emitWinSizeChangeTask(true);
  }

  sizeFullScreenContent(el, winSize) {
    console.log('ELEMENT:', el);
    let ratio = {
      x: 0.5625,
      y: 1.777777777777778
    };
    let elWrapper = {
      x: winSize.y * ratio.y,
      y: winSize.x * ratio.x
    };
    let newSize = {};

    if (elWrapper.y < winSize.y) {
      newSize = {
        x: winSize.y * ratio.y,
        y: winSize.y
      };
    } else if (elWrapper.x < winSize.x) {
      newSize = {
        x: winSize.x,
        y: winSize.x * ratio.x
      };
    } else {
      newSize = {
        x: winSize.y * ratio.y,
        y: winSize.y
      };
    }
    ;
    this.changeSize(el, newSize);

  }

  changeSize(el, newSize) {
    console.log('NEW SIZE:', newSize);
    console.log('ELEMENT:', el);
    $(el).css({
      width: newSize.x + 'px',
      height: newSize.y + 'px'
    });
  }

}

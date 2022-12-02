import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-interactivevideoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent implements OnInit {
  @Input()
  data;
  @Input()
  active;
  @Input()
  vidPlay;

  @ViewChild('clickDetect')
  clickEl: ElementRef;

  private vidPercent;
  private vidTime;
  private attempts;
  private activeFrame;
  private activeAttempt = {
    activeFrame: 0,
    id: 0,
    possible: 0,
    status: null,
    display: null,
    x: null,
    y: null,
    timeout: null
  };

  @Output()
  stepComplete: EventEmitter<object> = new EventEmitter<object>();

  constructor(private rd: Renderer2) {
  }

  @HostListener('click', ['$event', '$event.target'])
  onClick(event, target) {
    console.log('The event: ', event, target.className);

    if (target.className !== 'click-detect') {
      return;
    }

    if (this.vidPercent < 99) {
      this.checkAttempt(event);
    } else {
      this.videoComplete();
    }
  }

  ngOnInit() {
    this.getAttempts();
  }

  videoComplete() {

    this.stepComplete.emit(this.activeAttempt);
    this.stepComplete.complete();
  }

  videoTime(event) {
    this.vidTime = event;
    // console.log('VID TIME: ', this.vidTime)
    this.activeFrame = Math.round(this.vidTime * this.data.coords.framerate);
  }

  getAttempts() {

    let tempAttempts = [];
    for (let _i = 0; _i < this.data.coords.attempts; _i++) {
      let tempAttempt = {
        status: 'null',
        time: ''
      };
      tempAttempts.push(tempAttempt);
      console.error('INDEX: ', _i);
    }
    this.attempts = tempAttempts;
  }

  checkAttempt(event) {

    if (this.attempts[this.activeAttempt.id].status === 'correct') {
      return;
    }
    console.log('this.clickEl.nativeElement.offsetWidth:', this.clickEl.nativeElement.offsetWidth);
    console.log('this.clickEl.nativeElement.offsetHeight:', this.clickEl.nativeElement.offsetHeight);
    let click = {
      x: (100 / this.clickEl.nativeElement.offsetWidth) * event.offsetX,
      y: (100 / this.clickEl.nativeElement.offsetHeight) * event.offsetY
    };
    let clickRadius = 2.5;
    console.log('CLICK REGISTERED: ', this.data.coords.data);
    console.log('click x: ', click.x);
    console.log('click y: ', click.y);
    coordLoop: for (let coord of this.data.coords.data) {
      let coordTarget = {
        x: {
          min: ((100 / 1024) * coord[this.activeFrame].x) - ((100 / 1024) * (coord[this.activeFrame].scaleX * 100) / 2) - clickRadius,
          max: ((100 / 1024) * coord[this.activeFrame].x) + ((100 / 1024) * (coord[this.activeFrame].scaleX * 100) / 2) + clickRadius
        },
        y: {
          min: ((100 / 504) * coord[this.activeFrame].y) - ((100 / 504) * (coord[this.activeFrame].scaleY * 100) / 2) - clickRadius,
          max: ((100 / 504) * coord[this.activeFrame].y) + ((100 / 504) * (coord[this.activeFrame].scaleY * 100) / 2) + clickRadius
        }
      };
      console.log('COORD REGISTERED');
      console.log('coord x (min): ', coordTarget.x.min);
      console.log('coord x (max): ', coordTarget.x.max);
      console.log('coord y (min): ', coordTarget.y.min);
      console.log('coord y (max): ', coordTarget.y.max);
      console.warn('this.attempts: ', this.attempts);
      console.warn('this.activeAttempt.id: ', this.activeAttempt.id);

      this.activeAttempt.display = false;
      this.activeAttempt.possible = this.attempts.length;

      clearTimeout(this.activeAttempt.timeout);


      if (!(+coordTarget.x < 0 || +coordTarget.x >= 100 || +coordTarget.y < 0 || +coordTarget.y >= 100)
        && click.x > coordTarget.x.min && click.x < coordTarget.x.max
        && click.y > coordTarget.y.min && click.y < coordTarget.y.max) {
        this.attempts[this.activeAttempt.id].status = 'correct';
        this.activeAttempt.status = 'correct';
        break coordLoop;
      } else {
        this.attempts[this.activeAttempt.id].status = 'wrong';
        this.activeAttempt.status = 'wrong';
      }
    }

    this.activeAttempt.activeFrame = this.activeFrame;
    this.activeAttempt.x = click.x;
    this.activeAttempt.y = click.y;

    this.activeAttempt.display = true;

    this.activeAttempt.timeout = setTimeout(() => {
      this.activeAttempt.display = false;
    }, 500);

    if (this.attempts[this.activeAttempt.id].status === 'correct') {
      setTimeout(() => {
        this.videoComplete();
      }, 500);
    } else {

      ++this.activeAttempt.id;
      console.log('this.attempts: ', this.data.attempts);
      console.log('this.activeAttempt.id: ', this.activeAttempt.id);

      if (this.activeAttempt.id >= this.attempts.length) {
        this.videoComplete();
      }

    }
    // offsetX: 2
    // offsetY: 1
  }
}

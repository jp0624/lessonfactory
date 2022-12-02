import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss']
})
export class SpeedometerTypeComponent implements OnInit {
  @Input()
  activePage;
  @Input()
  activePageId;
  @ViewChild('videoPlayer')
  videoplayer: any;

  private vid: any = $('video.videoDriving');
  private complete: boolean = false;
  private timerStarted: boolean = false;

  private timer = {
    'start': 0,
    'end': 0,
    'total': 0,
    'deviated': {
      'active': false,
      'top': 0,
      'btm': 0,
      'total': 0
    },
    'distracted': {
      'active': false,
      'start': 0,
      'end': 0,
      'total': 0,
      'precent': 0,
    }
  };

  private videoInit: boolean = false;
  private phoneNumber: any = '8456259917';
  private phoneNumberEntered = [];
  private speedVal = 0;
  private lastSpeed;
  private visualSpeed = 0;
  private properSpeed = false;

  private curTime;
  private prevTime;
  private deltaTime;

  private speedometerTouch: boolean = false;
  private window_focus: boolean = false;

  private KEY_CODE_SPACE = 32;
  private SPRING_FACTOR = 4; //springyness
  private SPRING_DAMPING = 0.05; //multiplier to slow

  //private SPEED_CHANGE_AMOUNT = 2.5; // the amount to scroll when the up or down arrow is hit.
  private INCREASE_SPEED_AMMOUNT = 0.5;
  private DROP_SPEED_AMOUNT = 0.01;

  private MAX_SPEED = 405;
  private RANDOMIZE_MIN = 0.05;
  private RANDOMIZE_MAX = 1;

  private velocity = 0; // current speed that we're moving towards the target.
  private targetPosition = 0;	// the target position that w'ere aiming towards.
  private interacting = false; // whether or not the user is currently interacting with the page.
  private Math: any;

  private figureSize = {
    x: 0,
    y: 0
  };

  constructor() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.sizeFigure();
  }

  ngOnInit() {
    this.sizeFigure();
    this.phoneNumber = '' + Math.floor(Math.random() * 9000000000 + 1000000000);

    //this.Math.floor(1000000000 + this.Math.random() * 9000000000);
    if (this.vid[0]) {
      this.vid = this.vid[0];
    }

    console.log('PHONE NUMBER: ', this.phoneNumber);
    this.phoneNumber = this.phoneNumber.split('');

    console.log('PHONE NUMBER: ', this.phoneNumber);
    this.Math = Math;

    setTimeout(() => {
      this.addInteractionListeners();
      this.startUpdateLoop();
      this.curTime = (new Date()).getTime();
      this.prevTime = this.curTime;
    });

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

  checkVal(num) {
    console.log('num: ', num);
    if (+this.phoneNumber[this.phoneNumberEntered.length] === +num) {
      this.phoneNumberEntered.push(+num);
    }
    if (this.phoneNumber.length === this.phoneNumberEntered.length) {
      this.complete = true;

      this.timer.distracted.active = false;
      this.timer.distracted.end = (new Date()).getTime();
      this.timer.distracted.total += (this.timer.distracted.end - this.timer.distracted.start);

      this.timer.end = (new Date()).getTime();
      this.timer.total = (this.timer.end - this.timer.start);
      this.timer.distracted.precent = Math.round((100 / this.timer.total * this.timer.distracted.total) * 10) / 10;

      this.timer.deviated.total += this.timer.deviated.top - 45;
      this.timer.deviated.total += 37 - this.timer.deviated.btm;
      this.timer.deviated.total = Math.round(this.timer.deviated.total * 10) / 10;

      this.videoplayer.nativeElement.currentTime = 9.29;
      this.videoplayer.nativeElement.play();

      console.log('DONE!');
      console.error(this.timer);
    }
    console.log('this.phoneNumber[this.phoneNumberEntered.length]: ', this.phoneNumber[this.phoneNumberEntered.length]);
    console.log('this.phoneNumberEntered: ', this.phoneNumberEntered);

  }

  addInteractionListeners() {
    window.addEventListener('keydown', this.onTouchStart, true);
    window.addEventListener('keyup', this.onTouchEnd, true);

    /*
    window.addEventListener("mousedown",  this.onTouchStart);
    window.addEventListener("mouseup",    this.onTouchEnd);

    window.addEventListener("touchstart",   this.onTouchStart);
    window.addEventListener("touchend",     this.onTouchEnd);
    window.addEventListener("touchleave",   this.onTouchEnd);
    window.addEventListener("touchcancel",  this.onTouchEnd);
    */

  }

  onTouchStart = (evt) => {
    //evt.preventDefault();
    //console.log('EVENT: ', evt);

    this.speedometerTouch = true;

    if (!this.videoInit) {
      this.videoInit = true;
      this.videoplayer.nativeElement.currentTime = 2;
      this.videoplayer.nativeElement.play();
    }

  };
  onTouchEnd = (evt) => {
    //evt.preventDefault();
    this.speedometerTouch = false;
  };

  startUpdateLoop() {
    //DOM.requestAnimationFrame
    window.requestAnimationFrame(this.update);
  }

  update = () => {
    $(window).focus(function () {
      this.window_focus = true;

    }).blur(function () {
      this.targetPosition = 0;
      this.window_focus = false;

    });
    if (this.speedometerTouch) {
      //console.log('up')
      this.speedUp();
    } else if (!this.speedometerTouch) {
      //console.log('down')
      this.speedDown();
    }

    this.updateDeltaTime();
    this.moveSpeedToTarget();
    this.updateSpeed();

    this.lastSpeed = this.speedVal;
    this.speedDown();
    window.requestAnimationFrame(this.update);
  };

  //possibly needed to prevent double tap.. to be tested later
  preventZoom(e) {
    var t2 = e.timeStamp;
    var t1 = e.currentTarget.dataset.lastTouch || t2;
    var dt = t2 - t1;
    var fingers = e.touches.length;
    e.currentTarget.dataset.lastTouch = t2;

    if (!dt || dt > 500 || fingers > 1) return; // not double-tap

    e.preventDefault();
    e.target.click();
  }

  speedDown() {

    //RADNDOMIZE DROP SPEED
    this.DROP_SPEED_AMOUNT = Math.random() * (this.RANDOMIZE_MAX - this.RANDOMIZE_MIN) + this.RANDOMIZE_MIN;

    if (this.targetPosition >= 1) {
      this.targetPosition -= this.DROP_SPEED_AMOUNT;
    } else if (this.targetPosition < 1) {
      this.targetPosition = 0;
    }
  }

  speedUp() {
    //RADNDOMIZE CLIMB SPEED
    this.INCREASE_SPEED_AMMOUNT = Math.random() * ((this.RANDOMIZE_MAX * 5) - this.RANDOMIZE_MIN) + this.RANDOMIZE_MIN;
    if (this.targetPosition >= this.MAX_SPEED) {

      this.targetPosition = this.MAX_SPEED;
    } else if (this.targetPosition < this.MAX_SPEED) {

      this.targetPosition += this.INCREASE_SPEED_AMMOUNT;
    }
    //console.log('this.targetPosition: ', this.targetPosition)
  }

  updateDeltaTime() {
    this.prevTime = this.curTime;
    this.curTime = (new Date()).getTime();
    this.deltaTime = (this.curTime - this.prevTime) / 1000;
  }

  moveSpeedToTarget() {
    let direction = (this.targetPosition) - this.speedVal;

    direction = direction * this.SPRING_FACTOR;
    this.velocity = (this.velocity * this.SPRING_DAMPING) + direction;
    this.speedVal = this.speedVal + this.velocity * this.deltaTime;
  }

  updateSpeed() {

    //let videoSpeed = (100 / 40)  * (this.speedVal / 4.38) * 0.01
    let videoSpeed = (100 / 40) * (this.speedVal / 4.38) * 0.01;
    //console.log(videoSpeed);
    if (this.complete === false) {
      let playSpeed = Math.round(+videoSpeed * 10) / 10;

      if (playSpeed > 3) {
        playSpeed = 3;
        this.videoplayer.nativeElement.playbackRate = 3;
      }
      this.videoplayer.nativeElement.playbackRate = playSpeed;
      console.log(playSpeed);

    } else if (this.complete === true) {
      this.videoplayer.nativeElement.playbackRate = 1.5;
    }
    //loop time 9:28

    if (this.videoplayer.nativeElement.currentTime > 9.85 && this.complete === false) {
      this.videoplayer.nativeElement.currentTime = 0;
    }
    this.visualSpeed = this.speedVal / 4.38;

    if (this.visualSpeed >= 37 && this.visualSpeed <= 45) {

      // if(this.timerStarted === false){

      //   this.timer.deviated.btm = this.visualSpeed;
      //   this.timer.deviated.top = this.visualSpeed;

      //   this.timer.start = (new Date()).getTime();
      //   this.timerStarted = true;
      // }

      this.properSpeed = true;

      // if(this.timer.distracted.active === true){
      //   this.timer.distracted.active = false;
      //   this.timer.distracted.end = (new Date()).getTime();
      //   this.timer.distracted.total += (this.timer.distracted.end - this.timer.distracted.start)
      //   console.error('DISTRACTED FOR: ', this.timer.distracted.end - this.timer.distracted.start);
      //   console.error('DISTRACTED FOR TOTAL: ', this.timer.distracted.total);
      // }
    } else {
      // if(this.timerStarted === true){

      //   if(this.visualSpeed < this.timer.deviated.btm){
      //     this.timer.deviated.btm = this.visualSpeed
      //   }else if(this.visualSpeed > this.timer.deviated.top){
      //     this.timer.deviated.top = this.visualSpeed
      //   }
      // }

      if (this.timerStarted === true && this.timer.distracted.active === false) {
        this.timer.distracted.active = true;
        this.timer.distracted.start = (new Date()).getTime();
      }

      this.properSpeed = false;
    }
    /*
    if(this.visualSpeed >= 40 && this.visualSpeed <= 42){

      //makes a small buffer
      this.visualSpeed = 40;

    }else*/
    if (this.visualSpeed < 0) {
      this.visualSpeed = 0;
    }
    $('circle.foreground').css('strokeDasharray', this.speedVal + ', 500');
  }
}

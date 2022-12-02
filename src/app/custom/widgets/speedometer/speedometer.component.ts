import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as $ from 'jquery';

import {TimerService} from '../../../services/timer.service';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss']
})
export class SpeedometerComponent implements OnInit {
  @Input()
  goal;
  @Output()
  speedChange: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  speedGoal: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  maintainPercent: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  updateResults: EventEmitter<any> = new EventEmitter<any>();

  private timeSubscription;

  private speedVal = 0;
  private lastSpeed;

  public complete;
  public visualSpeed = 0;
  public properSpeed = {
    'status': false,
    'start': 0,
    'end': 0,
    'total': 0
  };
  private maintainTime = 10000;

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
  public Math: any;

  private timerStarted;
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
  private idleTime: number = 0;
  private idleSpeed: number;

  constructor(private time: TimerService,
              public globalService: GlobalService) {
  }

  ngOnInit() {
    this.Math = Math;
    this.addInteractionListeners();

    this.timeSubscription = this.time.timeChange
      .subscribe(change => {
        //console.log('TOTAL TIME: ', this.properSpeed.total);
        if (Math.round(this.speedVal) / 100 === Math.round(this.idleSpeed) / 100) {
          // console.log('this.time.deltaTime: ', this.time.deltaTime)
          this.idleTime += this.time.deltaTime;

          // console.log('IDLE: ' + this.idleSpeed + ' SPEED: ' + this.speedVal + ' IDLE TIME: ' +  this.idleTime);
          if (this.idleTime >= 1) {
            this.idleTime = 0;
            this.forceTouchEnd();
          }
        }
        this.idleSpeed = this.speedVal;

        if (this.properSpeed.total <= this.maintainTime) {
          this.emitChangeMaintainSpeed((100 / this.maintainTime) * this.properSpeed.total);
        }
        if (this.speedometerTouch) {
          //console.log('up')
          this.speedUp();
        } else if (!this.speedometerTouch) {
          //console.log('down')
          this.speedDown();
        }
        this.moveSpeedToTarget();
        this.updateSpeed();
        //console.log('deltaTime: ', this.time.deltaTime)
      });
  }

  addInteractionListeners() {
    window.addEventListener('keydown', this.onKeyDown, true);
    window.addEventListener('keyup', this.onTouchEnd, true);

    // window.addEventListener("mousedown",  this.onTouchStart);
    // window.addEventListener("mouseup",    this.onTouchEnd);

    // window.addEventListener("touchstart",   this.onTouchStart);
    // window.addEventListener("touchend",     this.onTouchEnd);
    // window.addEventListener("touchleave",   this.onTouchEnd);
    // window.addEventListener("touchcancel",  this.onTouchEnd);

  }

  forceTouchEnd() {
    this.onTouchEnd('event');
  }

  onKeyDown = (evt) => {
    //console.log('evt: ', evt)
    if (evt.keyCode === 32) {
      this.onTouchStart(evt);
    }
  };
  onTouchStart = (evt) => {
    //evt.preventDefault();
    //console.log('TOUCH START');
    this.speedometerTouch = true;
  };
  onTouchEnd = (evt) => {
    //console.log('TOUCH END');
    //evt.preventDefault();
    this.speedometerTouch = false;
  };

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
    // RADNDOMIZE CLIMB SPEED
    this.INCREASE_SPEED_AMMOUNT = Math.random() * ((this.RANDOMIZE_MAX * 5) - this.RANDOMIZE_MIN) + this.RANDOMIZE_MIN;

    if (this.targetPosition >= this.MAX_SPEED) {
      this.targetPosition = this.MAX_SPEED;
    } else if (this.targetPosition < this.MAX_SPEED) {
      this.targetPosition += this.INCREASE_SPEED_AMMOUNT;
    }
  }

  moveSpeedToTarget() {
    // console.log('this.targetPosition: ', this.targetPosition);
    // console.log('this.speedVal: ', this.speedVal);
    let direction = (this.targetPosition) - this.speedVal;

    direction = direction * this.SPRING_FACTOR;
    // console.log('direction: ', direction);

    this.velocity = (this.velocity * this.SPRING_DAMPING) + direction;
    // console.log('this.time.deltaTime: ', this.time.deltaTime)
    let deltaTime = this.time.deltaTime || 0;
    this.speedVal = this.speedVal + this.velocity * deltaTime;
    this.emitChangeSpeed(this.speedVal);

    // console.log('this.velocity : ', this.velocity );
    // console.log('this.speedVal: ', this.speedVal);
  }

  emitChangeMaintainSpeed(value) {
    this.maintainPercent.emit(value);
  }

  emitChangeSpeed(value) {
    this.speedChange.emit(value);
  }

  emitSpeedGoal(value) {
    this.speedGoal.emit(value);
  }

  emitResults() {
    this.updateResults.emit(this.timer);
  }

  updateSpeed() {

    let videoSpeed = (100 / 40) * (this.speedVal / 4.38) * 0.01;
    // this.visualSpeed = this.speedVal / 4.38;  //40 MP/H
    // this.visualSpeed = this.speedVal / 2.88;    //60 KM/H

    this.visualSpeed = this.speedVal / this.goal.multiplier;  //40 MP/H

    if (this.visualSpeed >= this.goal.min && this.visualSpeed <= this.goal.max) {
      // if(this.visualSpeed >= 37 && this.visualSpeed <= 45) {

      this.emitSpeedGoal(true);
      if (!this.timerStarted) {
        this.startTimer();
      }
      ;

      if (this.timer.distracted.active) {
        this.disableDistracted();
      }
      ;

      if (!this.properSpeed.status) {

        this.properSpeed.status = true;
        this.properSpeed.start = this.time.curTime;

      } else if (this.properSpeed.status) {

        this.properSpeed.total += this.time.curTime - this.properSpeed.start;
        this.properSpeed.start = this.time.curTime;
      }

    } else if (this.visualSpeed < 0) {

      this.visualSpeed = 0;
    } else {

      if (this.timerStarted === true && this.timer.distracted.active === false) {
        this.enableDistracted();
      }
      if (this.timerStarted) {
        this.queryDeviated();
      }
      this.properSpeed.status = false;
    }
    this.emitResults();
    // console.log(this.visualSpeed);
    $('circle.foreground').css('strokeDasharray', this.speedVal + ', 500');
  }

  startTimer() {
    // console.log('START TIMER!')
    this.timer.deviated.btm = this.visualSpeed;
    this.timer.deviated.top = this.visualSpeed;

    this.timer.start = (new Date()).getTime();
    this.timerStarted = true;
  }

  enableDistracted() {
    // console.log('START enableDistracted!')
    this.timer.distracted.active = true;
    this.timer.distracted.start = (new Date()).getTime();
  }

  queryDeviated() {
    // console.log('START queryDeviated!')
    if (this.visualSpeed < this.timer.deviated.btm) {
      this.timer.deviated.btm = this.visualSpeed;
    } else if (this.visualSpeed > this.timer.deviated.top) {
      this.timer.deviated.top = this.visualSpeed;
    }
  }

  disableDistracted() {
    // console.log('START disableDistracted!')
    this.timer.distracted.active = false;
    this.timer.distracted.end = (new Date()).getTime();
    this.timer.distracted.total += (this.timer.distracted.end - this.timer.distracted.start);
    // console.error('DISTRACTED FOR: ', this.timer.distracted.end - this.timer.distracted.start);
    // console.error('DISTRACTED FOR TOTAL: ', this.timer.distracted.total);

  }


}

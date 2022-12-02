import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

@Injectable()
export class TimerService {

  public curTime;
  public prevTime;
  public deltaTime;

  private changeInit = new BehaviorSubject<number>(0);
  timeChange = this.changeInit.asObservable();

  constructor() {
  }

  startUpdateLoop() {

    window.requestAnimationFrame(this.update);
  }

  update = () => {
    // console.log('deltaTime: ', this.deltaTime);
    this.updateDeltaTime();
    window.requestAnimationFrame(this.update);
  };

  updateDeltaTime() {

    this.prevTime = this.curTime;
    this.curTime = (new Date()).getTime();
    this.deltaTime = (this.curTime - this.prevTime) / 1000;

    if (this.deltaTime) {
      this.emitChangeTask(true);
    }
  }

  emitChangeTask(value) {
    this.changeInit.next(value);
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {LessonDataService} from '../../../../services/lessondata.service';
import {NavigationService} from '../../../../services/navigation.service';

@Component({
  selector: 'app-timed',
  templateUrl: './timed.component.html',
  styleUrls: ['./timed.component.scss']
})
export class TimedComponent implements OnInit {
  @Input()
  activePage;
  @Input()
  class;
  @Input()
  icon;
  @Input()
  text;
  @Input()
  lockTime;
  @Input()
  lockType;
  @Input()
  mode;

  status = false;
  btnData: any;
  animate = false;
  download: number;
  transitionTime: number;

  private taskChange;
  private subscription: Subscription;

  constructor(private lessonDataService: LessonDataService,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.subscription = this.navigationService.navigationChange
      .subscribe(change => {
        this.btnData = change;
        console.warn('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CHANGE HAPPENED IN TIMED', change);
        this.resetBtn();
      });
  }

  resetBtn() {
    // console.log('RESET FUNC CALLED');
    this.status = false;
    this.animate = false;
    this.transitionTime = 0;

    setTimeout(() => {
      this.startBtn();
    }, 50);

  }

  startBtn() {
    if (this.btnData.lock === 'download') {
      this.download = +this.btnData.percent;
      if (this.btnData.percent === 100) {
        this.status = true;
      }
    }
    if (this.btnData.lock === 'none') {
      this.lockType = 'none';
      this.transitionTime = 0;
      setTimeout(() => {
        this.animate = true;
      });

      setTimeout(() => {
        this.status = true;
      }, this.transitionTime);
    }
    if (this.btnData.lock === 'time-char' || this.btnData.lock === 'time-page') {
      this.transitionTime = this.btnData.time;
      setTimeout(() => {
        this.animate = true;
      });

      setTimeout(() => {
        this.status = true;
      }, this.transitionTime);
    }

  }

  btnClicked() {
    if (!this.status) {
      return;
    }
    

    this.navigationService.nextBtnClick();
  }

}

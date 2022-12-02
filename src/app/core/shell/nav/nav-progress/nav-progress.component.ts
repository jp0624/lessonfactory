import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';

import {LessonDataService} from '../../../../services/lessondata.service';

import {ShellService} from '../../../../services/shell.service';
import {GlobalService} from '../../../../services/global.service';

@Component({
  selector: 'app-nav-progress',
  templateUrl: './nav-progress.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./nav-progress.component.scss']
})
export class NavProgressComponent implements OnInit {
  @HostBinding('class.rtl')
  isRtl;
  @Input()
  mode;

  constructor(public shellService: ShellService,
              public lessonDataService: LessonDataService,
              private globalService: GlobalService) {
  }

  ngOnInit() {
    if (this.lessonDataService.textDir === 'rtl') {
      this.isRtl = true;
    }
  }

  gotoUrl() {
    let Url;
    if (this.globalService.mode !== 'public') {
      Url = '/';

    } else if (this.globalService.mode === 'public') {
      Url = 'https://fd.fleetdefense.com/my/';
    }
    window.location.href = Url;

  }
}

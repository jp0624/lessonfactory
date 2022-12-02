import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {LessonDataService} from '../../../../services/lessondata.service';
import {ShellService} from '../../../../services/shell.service';
import {UpdateRoutesService} from '../../../../services/updateroutes.service';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent implements OnInit {
  @Input()
  activePage;
  @Input()
  activePageId;
  @Input()
  mode;
  @HostBinding('class.rtl')
  isRtl;

  constructor(public updateRoutesService: UpdateRoutesService,
              public lessonDataService: LessonDataService,
              public shellService: ShellService) {
  }

  ngOnInit() {
    console.error('this.lessonDataService: ', this.lessonDataService);
    console.error('this.lessonDataService: ', this.lessonDataService);
    console.error('this.lessonDataService: ', this.lessonDataService);
    console.error('this.lessonDataService: ', this.lessonDataService);
    if (this.lessonDataService.textDir === 'rtl') {
      this.isRtl = true;
    }
  }

}

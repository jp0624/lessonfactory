import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {LessonDataService} from '../../../services/lessondata.service';
import {ShellService} from '../../../services/shell.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  activePage;
  @Input()
  activePageId;
  @Input()
  heading;
  @Input()
  subheading;
  @Input()
  reverse;

  @HostBinding('class.rtl') isRtl: boolean = false;

  constructor(private lessonDataService: LessonDataService,
              private shellService: ShellService) {
  }

  ngOnInit() {
    if (this.lessonDataService.textDir === 'rtl') {
      this.isRtl = true;
    }
  }

}

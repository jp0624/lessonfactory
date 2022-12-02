import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {LessonDataService} from '../../../services/lessondata.service';

@Component({
  selector: 'app-figcaption',
  templateUrl: './figcaption.component.html',
  styleUrls: ['./figcaption.component.scss']
})
export class FigcaptionComponent implements OnInit {
  @Input()
  heading;
  @Input()
  text;
  @Input()
  class;

  @HostBinding('class.rtl') isRtl: boolean = false;

  constructor(private lessonDataService: LessonDataService) {
  }

  ngOnInit() {
    if (this.lessonDataService.textDir === 'rtl') {
      this.isRtl = true;
    }
  }

}

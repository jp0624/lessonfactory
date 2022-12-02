import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {LessonDataService} from '../../../../../../services/lessondata.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input()
  answer;
  @Input()
  id;
  @Output()
  answered: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  selected: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('class.rtl')
  isRtl: boolean = false;

  constructor(private lessonDataService: LessonDataService) {
  }

  ngOnInit() {
    if (this.lessonDataService.textDir === 'rtl') {
      this.isRtl = true;
    }
  }

  confirmAnswer() {
    this.answered.emit(this.answer);
  }

  selectAnswer() {
    console.log('selected');
    this.selected.emit(this.id);
  }
}

import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {LessonDataService} from '../../../../../../../services/lessondata.service';

@Component({
  selector: 'app-essentialanswer',
  templateUrl: './essentialanswer.component.html',
  styleUrls: ['./essentialanswer.component.scss']
})
export class EssentialAnswerComponent implements OnInit {
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
    console.log('this.answer====>', this.answer);
  }

  confirmAnswer() {
    this.answered.emit(this.answer);
    console.log('confirm answer ==========>',this.answer);
  }

  selectAnswer() {
    console.log('selected');
    this.selected.emit(this.id);
    console.log('answer id ==========>',this.id);
  }
}

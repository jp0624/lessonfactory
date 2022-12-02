import {Component, Input, OnInit} from '@angular/core';
import {LessonDataService} from '../../../../services/lessondata.service';
import {NavigationService} from '../../../../services/navigation.service';

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.scss']
})
export class RouterComponent implements OnInit {
  @Input()
  icon;
  @Input()
  class;
  @Input()
  path;
  @Input()
  text;
  @Input()
  taskId;
  @Input()
  type;


  constructor(private lessonDataService: LessonDataService,
              public navigationService: NavigationService) {
  }

  ngOnInit() {
  }

}

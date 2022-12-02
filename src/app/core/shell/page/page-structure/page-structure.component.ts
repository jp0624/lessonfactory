import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {LessonDataService} from '../../../../services/lessondata.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-page-structure',
  templateUrl: './page-structure.component.html',
  styleUrls: ['./page-structure.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageStructureComponent implements OnInit {
  @Input()
  activePage: any;
  @Input()
  activePageId: any;

  constructor(private lessonDataService: LessonDataService) {
  }

  ngOnInit() {
    console.log('ACTIVE PAGE>>>>>>>>>>>: ', this.activePage);
    console.log('ACTIVE PAGE Id>>>>>>>>>>>: ', this.activePageId);

    if (this.activePage.pagecenter) {
      setTimeout(() => {
        this.centerContent();
      });
    }
  }

  nextTask() {
    console.log(this.lessonDataService.dataLoaded);
  }

  centerContent() {
    //avaiable canvas
    let canvas = $('.lesson-wrapper').innerWidth();
    console.warn('canvas: ', canvas);

    //headers
    let headers = $('.header-task').outerHeight(true);
    console.warn('headers: ', headers);

    //content
    let content = $('figcaption').outerHeight(true);
    console.warn('content: ', content);

    let availSpace = canvas - headers - content;
    console.warn('AVALABLE SPACE: ', availSpace);
  }

  /*
  //avaiable canvas
  canvas = $('.lesson-wrapper').innerWidth();

  //headers
  headers = $('.header-task').outterHeight();

  //content
  content = $('figcaption').outterHeight();

  availSpace = canvas - headers - content



  */
}

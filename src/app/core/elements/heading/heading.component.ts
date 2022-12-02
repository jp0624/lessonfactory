import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {
  @Input()
  type: string;
  @Input()
  content: string;
  @Input()
  class: string;
  @Input()
  customClass: string;

  constructor() {
  }

  ngOnInit() {
    console.log('CONTENT: ', this.content);
  }

}

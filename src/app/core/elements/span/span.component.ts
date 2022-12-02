import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-span',
  templateUrl: './span.component.html',
  styleUrls: ['./span.component.css']
})
export class SpanComponent implements OnInit {
  @Input()
  text;
  @Input()
  class;

  constructor() {
  }

  ngOnInit() {
  }

}

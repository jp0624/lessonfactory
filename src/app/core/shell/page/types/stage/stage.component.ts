import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StageComponent implements OnInit {
  @Input()
  css;
  @Input()
  html;
  @Input()
  activeClass;
  @Input()
  activeCss;
  @Input()
  nextBtn;

  @Output()
  nextScene: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  next() {
    this.nextScene.emit(true);
  }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class StandardComponent implements OnInit {
  @Input()
  icon;
  @Input()
  class;
  @Input()
  text;
  @Input()
  type;

  constructor() {
  }

  ngOnInit() {

  }

}

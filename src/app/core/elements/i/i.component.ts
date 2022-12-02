import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-i',
  templateUrl: './i.component.html',
  styleUrls: ['./i.component.scss']
})
export class IComponent implements OnInit {
  @Input()
  icon;

  constructor() {
  }

  ngOnInit() {
  }

}

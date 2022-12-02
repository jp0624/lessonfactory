import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-type',
  templateUrl: './page-type.component.html',
  styleUrls: ['./page-type.component.scss']
})
export class PageTypeComponent implements OnInit {
  @Input()
  activePage;
  @Input()
  activePageId;

  constructor() {
  }

  ngOnInit() {
  }

}

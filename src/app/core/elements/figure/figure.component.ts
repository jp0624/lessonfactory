import {Component, Input, OnInit} from '@angular/core';

import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.scss']
})
export class FigureComponent implements OnInit {
  @Input()
  imgSrc: string;
  @Input()
  imgAlt: string;
  @Input()
  imgData: string;

  constructor(private globalService: GlobalService) {
  }

  ngOnInit() {
  }

}

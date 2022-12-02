import {Component, Input, OnInit} from '@angular/core';

import {DomSanitizer} from '@angular/platform-browser';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit {
  @Input()
  src: string;
  @Input()
  loadSrc: boolean;

  constructor(private sanitizer: DomSanitizer,
              private globalService: GlobalService) {
  }

  ngOnInit() {
  }

}

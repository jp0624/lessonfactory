import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent implements OnInit {
  @Input()
  markerData;

  constructor() {
  }

  ngOnInit() {
    console.warn('MARKER DATA: ', this.markerData);
  }

}

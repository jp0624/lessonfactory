import {Component, Input, OnInit} from '@angular/core';

import {GlobalService} from '../../../services/global.service';
import {TimerService} from '../../../services/timer.service';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent implements OnInit {
  @Input()
  videoArray;
  @Input()
  autoPlay;
  @Input()
  vidPlay;
  @Input()
  btnPlay = true;
  @Input()
  playsinline;
  @Input()
  pauseable;
  @Input()
  markers;
  @Input()
  timeline;
  @Input()
  theme;
  @Input()
  setTime;

  private videoPoster;
  private hidePoster;
  private curtime;

  constructor(private time: TimerService,
              private globalService: GlobalService) {
  }

  ngOnInit() {
    this.videoPoster = this.videoArray[0].poster;
    console.log('this.videoPoster: ', this.videoPoster);
  }

  videoTime(event) {
    let curtime = event;
  }

  restart() {
    this.vidPlay = false;

    setTimeout(() => {
      this.setTime = 0;
      this.vidPlay = true;

    }, 50);
  }

  replay10() {

    let jumpTo = this.curtime - 10;
    if (jumpTo < 0) {
      jumpTo = 0;
    }
    this.setTime = jumpTo;

    setTimeout(() => {
      this.vidPlay = true;
    }, 50);
  }

  play() {
    console.log('PLAY');
    this.btnPlay = false;
    this.vidPlay = true;
    this.hidePoster = true;

  }

  pause() {
    console.log('PAUSE');
    this.vidPlay = false;
    this.btnPlay = true;
  }

  togglePlayback() {
    if (!this.vidPlay) {
      this.vidPlay = true;
      this.hidePoster = true;

    } else if (this.vidPlay) {
      this.vidPlay = false;
      this.btnPlay = true;
    }
  }
}

import { Component, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, Input, HostListener, Directive, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { GlobalService }    from '../../../services/global.service';
import { TimerService } from '../../../services/timer.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
    figureSize;
  @Input()
    videoArray;
  @Input()
    videoPoster;
  @Input()
    videoUrl;
  @Input()
    videoSpeed;
  @Input()
    autoPlay;
  @Input()
    vidPlay;
  @Input()
    btnPlay = true;
  @Input()
    class;
  @Input()
    speedVal;
  @Input()
    hidePoster;
  @Input()
    endVideo;
  @Input()
    playsinline;
  @Input()
    pauseable;
  @Input()
    markers;
  @Input()
    controls;
  @Input()
    timeline;
  @Input()
    loopTime;
  @Input()
    startTime;
  @Input()
    endFrom;
  @Input()
    theme;
  @Input()
    overlay;
  @Input()
    icons;
  @Input()
    disableClick;
  @Input()
    restartVid;
  @Input()
    out;
  @Input()
    in;  
  @Input()
   essentialBreak; 

  @ViewChild('videoPlayer')
    videoPlayer: ElementRef;

  @ViewChild('videoSource')
  videoSource: ElementRef;

  @Output()
  videoDetails: EventEmitter<any> = new EventEmitter<any>();

  @Output()
    videoComplete: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output()
    videoTime: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output()
    videoPercent: EventEmitter<number> = new EventEmitter<number>();
  @Output()
    expressPopup: EventEmitter<boolean> = new EventEmitter<boolean>(false);    
  @Output()
    essentialPopup: EventEmitter<any> = new EventEmitter<any>(); 
  public essentialCheck: boolean = false;
  public essentialLoop: number = 0;
  private playing;
  private playbackRate = 1;
  private finishVid = false;
  private complete: boolean = false;
  private percentComplete: number;
  private videoInit: boolean = false;
  private videoDuration: number;
  private durationMultiplier: number;
  private loop: boolean;
  private vidDur;
  private timeSubscription;

  constructor(
    private time: TimerService,
    private globalService: GlobalService,
    private rd: Renderer2
  ) { }

  ngAfterViewInit() {
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<VIEW INIT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('<<<>>> ', this.pauseable);
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

    // console.error('ICON!!! ', this.icons);
    // console.warn('This.markers: ', this.markers)

    this.videoDuration = this.videoPlayer.nativeElement.duration;

    this.timeSubscription = this.time.timeChange
    .subscribe(change => {
      let tmpVidDur = this.videoPlayer.nativeElement.duration;

      if(this.vidDur !== tmpVidDur){
        this.vidDur = tmpVidDur;
        this.videoDetails.emit(this.vidDur);
      }

      // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<TIME CHANGE>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      // console.log('<<<<<<<<<<<<<<<<<<<<<<<<< ' + change + ' >>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      this.videoTime.emit(this.videoPlayer.nativeElement.currentTime);
    
      if(!this.finishVid && this.loop && (this.videoPlayer.nativeElement.currentTime >= this.loopTime)) {
        // console.warn('LOOP >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        // console.warn('LOOPED AT: ', this.videoPlayer.nativeElement.currentTime)
        // console.warn('LOOPED AT: ', this.videoPlayer.nativeElement.currentTime)
        this.videoPlayer.nativeElement.currentTime = this.startTime;
      }
             
      this.percentComplete = 100 / this.videoPlayer.nativeElement.duration * this.videoPlayer.nativeElement.currentTime;

      this.videoPercent.emit(this.percentComplete);

      this.videoDuration = this.videoPlayer.nativeElement.duration;
      //console.log('this.percentComplete: ', this.percentComplete);
     //console.log('this.videoPlayer.nativeElement.currentTime:====> ', this.videoPlayer.nativeElement.currentTime);
      // Express in & out 
      if (this.out) {
        if (this.videoPlayer.nativeElement.currentTime >= this.out) {
          this.videoPlayer.nativeElement.pause();   
          this.expressPopup.emit(true);         
          this.expressPopup.complete();
        }
      }    
      // Essential breaks
     if (this.essentialBreak) {             
       if (this.videoPlayer.nativeElement.currentTime >= this.essentialBreak) {
          this.videoPlayer.nativeElement.pause();
          if(this.essentialCheck == false){
            console.log('this.essentialBreak', this.essentialBreak);  
            console.log('this.essentialBreak', this.essentialLoop);  
            if(localStorage.getItem('video-essentialbreak')) {
              let item = JSON.parse(localStorage.getItem('video-essentialbreak'))
              console.log('this.essentialLoop',item);
              this.essentialLoop = item.loop;
            }
            this.essentialPopup.emit(this.essentialLoop);
            this.essentialCheck = true;
            }
         }
         //console.log('this.essentialCheck',this.essentialCheck);
      } 
       if(this.percentComplete > 99) {
        this.percentComplete = 100;
        this.videoComplete.emit(true);

        this.videoPercent.complete();
        this.videoTime.complete();
        this.videoComplete.complete();
        //this.timeSubscription.unsubscribe();
      }

    });

  }
  ngOnInit() {
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<INIT>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('controls: ', this.controls);
    console.log('pausable: ', this.pauseable);
    console.log('timeline: ', this.timeline);
    if(this.loopTime){
      this.loop = true;
    }
    console.log('loopTime: ', this.loopTime);
    console.log('loop: ', this.loop);
  }
  restart(){
    setTimeout( ()=> {

      this.videoPlayer.nativeElement.currentTime = 0;
      this.videoPlayer.nativeElement.play();

    },50);
  }
  replay10(){
    let jumpTo = this.videoPlayer.nativeElement.currentTime - 10;
    if(jumpTo < 0){
      jumpTo = 0
    }
    this.videoPlayer.nativeElement.currentTime = jumpTo;

    setTimeout( ()=> {
      this.videoPlayer.nativeElement.play();
      this.vidPlay = true;
    },50);
  }
  play() {
    // Express in
    if (this.in) {
      this.videoPlayer.nativeElement.currentTime = this.in;
      this.videoPlayer.nativeElement.play();
    }  
    //local storage set for essential break    
  if(localStorage.getItem('video-essentialbreak')) {
      let item = JSON.parse(localStorage.getItem('video-essentialbreak'));
      this.videoPlayer.nativeElement.currentTime = item.startTime;
      this.videoPlayer.nativeElement.play();      
    }
    console.log('PLAY');
      this.videoPlayer.nativeElement.play();
      this.vidPlay = true;
      this.playing = true;
      this.hidePoster = true;

  }
  pause(){
    console.log('PAUSE');
    this.videoPlayer.nativeElement.pause();
    this.vidPlay = false;

  }
  togglePlayback() {   
    if(this.videoPlayer.nativeElement.paused && !this.vidPlay){

      this.videoPlayer.nativeElement.play();
      this.vidPlay = true;
      this.playing = true;
      this.hidePoster = true;

    } else if(this.vidPlay){

      this.videoPlayer.nativeElement.pause();
      this.vidPlay = false;
      this.btnPlay = true;
    }
  }
  ngOnChanges(event) {
    console.log('EVENT VIDEO CHANGE: ', event);
    if (event.essentialBreak) {
      // essential break condition handle start
      if(event.essentialBreak['currentValue']){
        this.videoPlayer.nativeElement.play();  
        this.essentialCheck = false; 
        if(localStorage.getItem('video-essentialbreak')) {
          let item = JSON.parse(localStorage.getItem('video-essentialbreak'))
          console.log('this.essentialLoop', this.essentialLoop);
          this.essentialLoop = item.loop;
        }  
        this.essentialLoop = this.essentialLoop + 1;
      }
      if(event.essentialBreak['currentValue'] == undefined){
        this.videoPlayer.nativeElement.play();  
      }
      // essential break condition handle end
    }
    // this.videoPlayer.nativeElement.playbackRate = this.playbackRate;
    
    
    if(this.videoPlayer){
      console.error('EVENT VIDEO CHANGE: ', event)
      if(event.restartVid){

        this.videoPlayer.nativeElement.currentTime = 0;
        // this.vidPlay = true;
      };

      if(event.videoUrl){
        let curtime = this.videoPlayer.nativeElement.currentTime;
        this.videoPlayer.nativeElement.pause();
        console.log(this.videoSource.nativeElement);
        this.videoSource.nativeElement.src = this.videoUrl;

        this.videoPlayer.nativeElement.load();
        this.videoPlayer.nativeElement.currentTime = curtime;
        this.videoPlayer.nativeElement.play();

        console.log('yay!')
      }

      console.log('VIDEO PLAYER EL EXISTS!')
      console.log('Playing: ', this.playing)
      console.log('videoInit: ', this.videoInit)
      console.log('vidPlay: ', this.vidPlay)
      //videoSource

      console.log('EVENT VIDEO CHANGE: ', event)

      if(!this.playing && this.vidPlay && !this.videoInit){
        this.hidePoster = true;
        console.error('TRACE');
        this.videoPlayer.nativeElement.play();
        console.log('AUTO PLAY INIT');

        this.playing = true;
        this.videoInit = true;
        // this.videoPlayer.nativeElement.currentTime = this.startTime;
      }

      if(this.vidPlay && this.videoInit && !this.playing) {
        console.error('TRACE change');
        this.videoPlayer.nativeElement.play();
        console.log('SET TO PLAY CHANGE DETECT')
        this.playing = true;

      } else if (!this.vidPlay && this.playing) {
        console.log('SET TO PAUSE CHANGE DETECT')
        this.videoPlayer.nativeElement.pause();
        this.playing = false;

      }

      if(this.endVideo && !this.finishVid) {
        this.videoPlayer.nativeElement.play();
        console.log('SET TO END CHANGE DETECT')

        this.finishVid = true;
        this.videoPlayer.nativeElement.currentTime = this.endFrom;

      }

    }

  }
}

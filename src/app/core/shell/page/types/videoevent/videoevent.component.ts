import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
  } from '@angular/core';
  import {ParamsService} from '../../../../../services/params.service';
  
  @Component({
    selector: 'app-videopage',
    templateUrl: './videoevent.component.html',
    styleUrls: ['./videoevent.component.scss']
  })
  export class VideoeventComponent implements OnInit {
    @Input()
    activePage;
    @Input()
    activePageId;
    
    @Output()
    contentStatus: EventEmitter<any> = new EventEmitter();
  
    private activeContent = {
      'chars': '',
      'index': 0,
      'length': 0,
      'time': 10,
      'type': 'video-complete'
    };
   
    constructor( private paramsService: ParamsService ) {
    }
  
  
    ngOnInit() {
        if (this.paramsService.paramData.initType === 'local'
        || this.paramsService.paramData.initType === 'preview') {
       
      }
      this.getComponentData();
    }
  
@ViewChild('videoPlayer') videoPlayer: ElementRef;

private videoData = {
      heading: '',
      url: ''
  };

getComponentData() {
    let content = this.activePage.content;
    console.log('content:', content);
    Object.keys(content).forEach(key => {
      console.log('item[key]: ', content[key]);
      if ('heading' in content[key]) {
        this.videoData.heading = content[key].heading.heading;
      }
      if ('video' in content[key]) {
        //this.videoData.url = content[key].video.src;
        this.videoData.url="https://introcave.com/preview/Glitch_Logo_Ver2_1.mp4";
      }
    });
    console.log('this.componentData:', this.videoData);
  }

public show:boolean = false;

 currentTime: number;

  setCurrentTime(data) {
       this.currentTime = data.target.currentTime;
       //console.log("video event duration:===>"+this.videoPlayer.nativeElement.duration);
       //console.log("current time:===>"+parseFloat(this.videoPlayer.nativeElement.currentTime).toFixed(2));
     if(this.videoPlayer.nativeElement.duration == this.videoPlayer.nativeElement.currentTime){
         console.log('completed');
         this.activeContent.type = 'none';
          this.contentStatus.emit(this.activeContent);
     }
  }

    pauseVideo()
    {
    
    this.videoPlayer.nativeElement.play();
        setTimeout(() => 
        {
        this.videoPlayer.nativeElement.pause();
        if(this.videoPlayer.nativeElement.paused)
        {
            this.show = !this.show;       
        } 
        }, 5000);
    
    }

    closebutton(){
    this.show = !this.show; 
    this.videoPlayer.nativeElement.play();
    }
    
  }
  
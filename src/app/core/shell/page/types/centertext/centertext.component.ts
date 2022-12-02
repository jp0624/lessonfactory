import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ShellService} from '../../../../../services/shell.service';
import {BookmarkService} from '../../../../../services/bookmark.service';

function _window(): any{
  return window;
}

@Component({
  selector: 'app-centertext',
  templateUrl: './centertext.component.html',
  styleUrls: ['./centertext.component.scss']
})
export class CentertextComponent implements OnInit {
  @Input()
  activePage;
  @Input()
  activePageId;

  @Output()
  contentStatus: EventEmitter<any> = new EventEmitter();

  private contentId = 0;
  private activeContent = {
    chars: '',
    index: 0,
    length: 0,
    time: 0,
    type: 'time-char'
  };

  constructor(private shellService: ShellService,
    private bookmarkService: BookmarkService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  ngOnInit() {
    this.getActiveContent();
    //SCORM post message condition handled start
    if (sessionStorage.getItem('user_id').includes("SCORM:")) {
        this.activePage.display_next = 0;
        let jsonMsg = {
          'srcFrom'    : 'Lesson',
          'username'   : sessionStorage.getItem('user_id'),
          'status'     : 'completed'  
        };
        this.bookmarkService.postLessonComplete();
        if( _window().self !==  _window().parent) {
              if ( _window().parent) {
                  console.log('post to parent===>',jsonMsg);
                  _window().parent.postMessage(jsonMsg, '*'); // I’m in an iFrame post to parent
              }
            } else {
              if ( _window().opener) {
                console.log('post to opener===>',jsonMsg);
                  _window().opener.postMessage(jsonMsg, '*'); // I’m NOT in an iFrame (new window/tab) so post to my opener
              }
          }
       }
    //SCORM  post message condition handled end
  }

  getActiveContent() {
    console.error('this.contentId: ', this.contentId);
    console.warn('this.activePage: ', this.activePage);
    this.activeContent.chars = this.activePage.content[0].headings.heading;
    this.activeContent.chars += this.activePage.content[0].headings.subheading;
    this.activeContent.chars += this.activePage.content[0].headings.text;

    this.activeContent.index = this.contentId + 1;
    this.activeContent.length = this.activePage.content.length;
    this.activeContent.time = this.activePage.lockTime;
    // this.activeContent.type = this.activePage.lockType;
    this.activeContent.type = 'time-char';

    console.warn('this.activeContent: ', this.activeContent);
    this.contentStatus.emit(this.activeContent);
  }

}

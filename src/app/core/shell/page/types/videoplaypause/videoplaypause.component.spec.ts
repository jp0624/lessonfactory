import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VideoplaypauseComponent} from './videoplaypause.component';

describe('VideoplaypauseComponent', () => {
  let component: VideoplaypauseComponent;
  let fixture: ComponentFixture<VideoplaypauseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoplaypauseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoplaypauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VideoassessmentComponent} from './videoassessment.component';

describe('VideoassessmentComponent', () => {
  let component: VideoassessmentComponent;
  let fixture: ComponentFixture<VideoassessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoassessmentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

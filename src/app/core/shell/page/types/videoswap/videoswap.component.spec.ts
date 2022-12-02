import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoswapComponent } from './videoswap.component';

describe('VideoswapComponent', () => {
  let component: VideoswapComponent;
  let fixture: ComponentFixture<VideoswapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoswapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoswapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

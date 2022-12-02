import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageswapComponent} from './imageswap.component';

describe('ImageswapComponent', () => {
  let component: ImageswapComponent;
  let fixture: ComponentFixture<ImageswapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageswapComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageswapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

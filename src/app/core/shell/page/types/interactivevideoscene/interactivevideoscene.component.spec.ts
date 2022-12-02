import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InteractivevideosceneComponent} from './interactivevideoscene.component';

describe('InteractivevideosceneComponent', () => {
  let component: InteractivevideosceneComponent;
  let fixture: ComponentFixture<InteractivevideosceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InteractivevideosceneComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractivevideosceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

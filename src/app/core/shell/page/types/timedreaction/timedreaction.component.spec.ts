import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TimedreactionComponent} from './timedreaction.component';

describe('TimedreactionComponent', () => {
  let component: TimedreactionComponent;
  let fixture: ComponentFixture<TimedreactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimedreactionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimedreactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

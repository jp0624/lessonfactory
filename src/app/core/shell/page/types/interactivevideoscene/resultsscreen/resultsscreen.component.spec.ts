import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultsscreenComponent} from './resultsscreen.component';

describe('ResultsscreenComponent', () => {
  let component: ResultsscreenComponent;
  let fixture: ComponentFixture<ResultsscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsscreenComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EssentialAnswerComponent} from './essentialanswer.component';

describe('AnswerComponent', () => {
  let component: EssentialAnswerComponent;
  let fixture: ComponentFixture<EssentialAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EssentialAnswerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssentialAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

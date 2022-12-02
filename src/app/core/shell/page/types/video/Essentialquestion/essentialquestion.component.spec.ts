import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EssentialQuestionComponent} from './essentialquestion.component';

describe('QuestionComponent', () => {
  let component: EssentialQuestionComponent;
  let fixture: ComponentFixture<EssentialQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EssentialQuestionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssentialQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

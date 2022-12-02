import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SectionmarkerComponent} from './sectionmarker.component';

describe('SectionComponent', () => {
  let component: SectionmarkerComponent;
  let fixture: ComponentFixture<SectionmarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionmarkerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionmarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

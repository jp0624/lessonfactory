import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FigcaptionComponent} from './figcaption.component';

describe('FigcaptionComponent', () => {
  let component: FigcaptionComponent;
  let fixture: ComponentFixture<FigcaptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FigcaptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigcaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

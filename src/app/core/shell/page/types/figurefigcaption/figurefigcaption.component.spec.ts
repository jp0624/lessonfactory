import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FigurefigcaptionComponent} from './figurefigcaption.component';

describe('FigurefigcaptionComponent', () => {
  let component: FigurefigcaptionComponent;
  let fixture: ComponentFixture<FigurefigcaptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FigurefigcaptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigurefigcaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

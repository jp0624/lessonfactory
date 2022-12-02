import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HtmlcssComponent} from './htmlcss.component';

describe('HtmlcssComponent', () => {
  let component: HtmlcssComponent;
  let fixture: ComponentFixture<HtmlcssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlcssComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlcssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

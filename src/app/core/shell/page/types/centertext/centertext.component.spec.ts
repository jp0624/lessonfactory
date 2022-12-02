import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CentertextComponent} from './centertext.component';

describe('CentertextComponent', () => {
  let component: CentertextComponent;
  let fixture: ComponentFixture<CentertextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CentertextComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentertextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TMM_Int1Component} from './int1.component';

describe('TMM_Int1Component', () => {
  let component: TMM_Int1Component;
  let fixture: ComponentFixture<TMM_Int1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TMM_Int1Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TMM_Int1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

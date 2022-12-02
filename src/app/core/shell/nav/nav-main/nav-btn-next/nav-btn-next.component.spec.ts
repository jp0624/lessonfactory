import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavBtnNextComponent} from './nav-btn-next.component';

describe('NavBtnNextComponent', () => {
  let component: NavBtnNextComponent;
  let fixture: ComponentFixture<NavBtnNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBtnNextComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBtnNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

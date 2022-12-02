import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoeventComponent } from './videoevent.component';

describe('VideoeventComponent', () => {
  let component: VideoeventComponent;
  let fixture: ComponentFixture<VideoeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesequenceComponent } from './imagesequence.component';

describe('ImagesequenceComponent', () => {
  let component: ImagesequenceComponent;
  let fixture: ComponentFixture<ImagesequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

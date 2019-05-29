import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Col101FormComponent } from './col101-form.component';

describe('Col101FormComponent', () => {
  let component: Col101FormComponent;
  let fixture: ComponentFixture<Col101FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Col101FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Col101FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

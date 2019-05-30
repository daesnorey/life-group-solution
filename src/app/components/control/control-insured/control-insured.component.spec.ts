import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlInsuredComponent } from './control-insured.component';

describe('ControlInsuredComponent', () => {
  let component: ControlInsuredComponent;
  let fixture: ComponentFixture<ControlInsuredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlInsuredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlInsuredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

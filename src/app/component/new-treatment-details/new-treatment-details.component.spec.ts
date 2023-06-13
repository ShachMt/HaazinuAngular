import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTreatmentDetailsComponent } from './new-treatment-details.component';

describe('NewTreatmentDetailsComponent', () => {
  let component: NewTreatmentDetailsComponent;
  let fixture: ComponentFixture<NewTreatmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTreatmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTreatmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

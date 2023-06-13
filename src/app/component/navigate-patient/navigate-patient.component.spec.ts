import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatePatientComponent } from './navigate-patient.component';

describe('NavigatePatientComponent', () => {
  let component: NavigatePatientComponent;
  let fixture: ComponentFixture<NavigatePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigatePatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

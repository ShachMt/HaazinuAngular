import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalInstitutionsApplicantComponent } from './educational-institutions-applicant.component';

describe('EducationalInstitutionsApplicantComponent', () => {
  let component: EducationalInstitutionsApplicantComponent;
  let fixture: ComponentFixture<EducationalInstitutionsApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalInstitutionsApplicantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalInstitutionsApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

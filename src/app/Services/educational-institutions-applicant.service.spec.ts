import { TestBed } from '@angular/core/testing';

import { EducationalInstitutionsApplicantService } from './educational-institutions-applicant.service';

describe('EducationalInstitutionsApplicantService', () => {
  let service: EducationalInstitutionsApplicantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalInstitutionsApplicantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

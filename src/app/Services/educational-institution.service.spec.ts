import { TestBed } from '@angular/core/testing';

import { EducationalInstitutionService } from './educational-institution.service';

describe('EducationalInstitutionService', () => {
  let service: EducationalInstitutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalInstitutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

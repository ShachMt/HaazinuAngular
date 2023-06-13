import { TestBed } from '@angular/core/testing';

import { TreatmentDetailsService } from './treatment-details.service';

describe('TreatmentDetailsService', () => {
  let service: TreatmentDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TerapistService } from './terapist.service';

describe('TerapistService', () => {
  let service: TerapistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerapistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

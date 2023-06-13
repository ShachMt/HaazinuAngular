import { TestBed } from '@angular/core/testing';

import { TheCauseReferralService } from './the-cause-referral.service';

describe('TheCauseReferralService', () => {
  let service: TheCauseReferralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheCauseReferralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

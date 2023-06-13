import { TestBed } from '@angular/core/testing';

import { DetailsAskerService } from './details-asker.service';

describe('DetailsAskerService', () => {
  let service: DetailsAskerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsAskerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

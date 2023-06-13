import { TestBed } from '@angular/core/testing';

import { InstitutionsCategoryService } from './institutions-category.service';

describe('InstitutionsCategoryService', () => {
  let service: InstitutionsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionsCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

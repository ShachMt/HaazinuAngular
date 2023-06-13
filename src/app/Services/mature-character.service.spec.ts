import { TestBed } from '@angular/core/testing';

import { MatureCharacterService } from './mature-character.service';

describe('MatureCharacterService', () => {
  let service: MatureCharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatureCharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

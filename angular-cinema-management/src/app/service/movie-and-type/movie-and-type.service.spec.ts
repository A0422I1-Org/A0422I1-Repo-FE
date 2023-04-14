import { TestBed } from '@angular/core/testing';

import { MovieAndTypeService } from './movie-and-type.service';

describe('MovieAndTypeService', () => {
  let service: MovieAndTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieAndTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

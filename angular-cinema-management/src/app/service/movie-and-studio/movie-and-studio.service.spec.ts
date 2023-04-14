import { TestBed } from '@angular/core/testing';

import { MovieAndStudioService } from './movie-and-studio.service';

describe('MovieAndStudioService', () => {
  let service: MovieAndStudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieAndStudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

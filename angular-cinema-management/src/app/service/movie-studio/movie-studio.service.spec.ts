import { TestBed } from '@angular/core/testing';

import { MovieStudioService } from './movie-studio.service';

describe('MovieStudioService', () => {
  let service: MovieStudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieStudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RatingMovieService } from './rating-movie.service';

describe('RatingMovieService', () => {
  let service: RatingMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

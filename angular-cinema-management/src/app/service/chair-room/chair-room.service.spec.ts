import { TestBed } from '@angular/core/testing';

import { ChairRoomService } from './chair-room.service';

describe('ChairRoomService', () => {
  let service: ChairRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChairRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

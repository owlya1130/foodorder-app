import { TestBed } from '@angular/core/testing';

import { ReservationTimeblockService } from './reservation-timeblock.service';

describe('ReservationTimeblockService', () => {
  let service: ReservationTimeblockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationTimeblockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

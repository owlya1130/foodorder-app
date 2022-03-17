import { TestBed } from '@angular/core/testing';

import { MealAndPriceService } from './meal-and-price.service';

describe('MealAndPriceService', () => {
  let service: MealAndPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealAndPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

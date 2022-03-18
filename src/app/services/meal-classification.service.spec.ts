import { TestBed } from '@angular/core/testing';

import { MealClassificationService } from './meal-classification.service';

describe('MealClassificationService', () => {
  let service: MealClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

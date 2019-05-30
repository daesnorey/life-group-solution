import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateCol101InsuredGuard } from './can-activate-col101-insured.guard';

describe('CanActivateCol101InsuredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateCol101InsuredGuard]
    });
  });

  it('should ...', inject([CanActivateCol101InsuredGuard], (guard: CanActivateCol101InsuredGuard) => {
    expect(guard).toBeTruthy();
  }));
});

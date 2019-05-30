import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateControlGuard } from './can-activate-control.guard';

describe('CanActivateControlGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateControlGuard]
    });
  });

  it('should ...', inject([CanActivateControlGuard], (guard: CanActivateControlGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateLoginGuard } from './can-activate-login.guard';

describe('CanActivateLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateLoginGuard]
    });
  });

  it('should ...', inject([CanActivateLoginGuard], (guard: CanActivateLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});

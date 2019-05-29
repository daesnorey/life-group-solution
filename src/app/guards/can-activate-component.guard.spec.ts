import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateComponentGuard } from './can-activate-component.guard';

describe('CanActivateComponentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateComponentGuard]
    });
  });

  it('should ...', inject([CanActivateComponentGuard], (guard: CanActivateComponentGuard) => {
    expect(guard).toBeTruthy();
  }));
});

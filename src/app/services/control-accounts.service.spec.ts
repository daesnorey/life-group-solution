import { TestBed } from '@angular/core/testing';

import { ControlAccountsService } from './control-accounts.service';

describe('ControlAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlAccountsService = TestBed.get(ControlAccountsService);
    expect(service).toBeTruthy();
  });
});

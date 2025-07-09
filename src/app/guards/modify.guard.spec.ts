import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { modifyGuard } from './modify.guard';

describe('modifyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => modifyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

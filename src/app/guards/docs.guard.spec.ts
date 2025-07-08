import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { docsGuard } from './docs.guard';

describe('docsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => docsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

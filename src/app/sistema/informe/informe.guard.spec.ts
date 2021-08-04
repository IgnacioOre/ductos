import { TestBed } from '@angular/core/testing';

import { InformeGuard } from './informe.guard';

describe('InformeGuard', () => {
  let guard: InformeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InformeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

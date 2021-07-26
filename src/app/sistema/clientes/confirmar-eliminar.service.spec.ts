import { TestBed } from '@angular/core/testing';

import { ConfirmarEliminarService } from './confirmar-eliminar.service';

describe('ConfirmarEliminarService', () => {
  let service: ConfirmarEliminarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmarEliminarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AddClienteService } from './add-cliente.service';

describe('AddClienteService', () => {
  let service: AddClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

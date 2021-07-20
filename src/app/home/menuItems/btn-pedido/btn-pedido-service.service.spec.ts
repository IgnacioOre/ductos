import { TestBed } from '@angular/core/testing';

import { BtnPedidoServiceService } from './btn-pedido-service.service';

describe('BtnPedidoServiceService', () => {
  let service: BtnPedidoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtnPedidoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AddProductoService} from './add-producto-service';

describe('AddProductoServiceService', () => {
  let service: AddProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

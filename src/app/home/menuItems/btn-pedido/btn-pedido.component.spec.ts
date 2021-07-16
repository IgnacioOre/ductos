import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPedidoComponent } from './btn-pedido.component';

describe('BtnPedidoComponent', () => {
  let component: BtnPedidoComponent;
  let fixture: ComponentFixture<BtnPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { AddPedidoService } from 'src/app/add-pedido/add-pedido-service';
import { Pedido } from 'src/app/IPedido';
import { PedidosService } from './pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidosCargados : boolean = false;
  pedidos : Pedido[] = [];
  constructor(private addPedidoService:AddPedidoService, public pedidosService: PedidosService) { }
  
  ngOnInit(): void {
    this.getPedidos();
  }
  
  abrirModal(){
    console.log("estoy en abrirModal de app.component.ts");
    this.addPedidoService.mostrarModal();
  }

  abrirModalEditar(pedido : Pedido) {
    this.pedidosService.mostrarModal(pedido);
    console.log("estoy en pedidos.component.ts");
  }

  abrirModalCerrarSesion() {
    this.pedidosService.mostrarModal2();
    console.log("estoy en pedidos.component.ts");
  }

  getPedidos() {
    this.pedidosService.getPedidos().subscribe(res => {
      this.pedidos = res;
      console.log(this.pedidos);
      this.pedidosCargados = true;
    });
  }

  deletePedido(){
    this.pedidosService;
  }
}

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
  constructor(public addPedidoService:AddPedidoService, public pedidosService: PedidosService) { }
  
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
    console.log("Usando la cosa loca");
    this.pedidosService.getPedidos().subscribe(res => {
      this.pedidos = res;
      console.log(this.pedidos);
      this.pedidosCargados = true;
    });
  }

  revisarPedido(event : Event) {
    this.getPedidos();
  }

  get obtenerFuncion() {
    return this.getPedidos.bind(this);
  }
  
  borrarPedido(pedido : Pedido) {
    console.log("Estoy en borrarPedido de pedidos.component.ts");
    console.log(pedido);
    this.pedidosService.deletePedido(pedido).subscribe(res => {
      console.log(res);
      this.getPedidos();
    });
  }
}

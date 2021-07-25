import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/IPedido';
import { LoginService } from 'src/app/services/login/login.service';
import { AddPedidoService } from './add-pedido/add-pedido-service';
import { PedidosService } from './pedidos.service';
import * as faker from 'faker';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidosCargados : boolean = false;
  pedidos : Pedido[] = [];

  p: number = 1;
  constructor(public addPedidoService:AddPedidoService, public pedidosService: PedidosService, public loginService : LoginService,
    public router : Router) { 
      /* Datos de prueba para pruebas
      this.pedidos = Array(50).fill(1).map(_ => {
        return {
          pedidoId: faker.datatype.number()+faker.datatype.number(),
          codigo: faker.random.alphaNumeric() + faker.random.alphaNumeric() + faker.random.alphaNumeric() + faker.random.alphaNumeric(),
          nombreCliente: faker.name.firstName() + " " + faker.name.lastName(),
          email: faker.internet.email(),
          telefono: faker.phone.phoneNumber(),
          fechaIngreso: faker.date.recent(),
          fechaEntrega: faker.date.soon(),
          nombrePedido: faker.hacker.noun(),
          presupuesto: faker.datatype.number(),
          estadoDelPedido: 'Recibido',
          estadoDePago: 'Pagado',
          abono: faker.datatype.number(),
          indicaciones: faker.lorem.sentence(),
          URLImagen: faker.image.imageUrl()
      };
      })*/
    }
  
  ngOnInit(): void {
    this.getPedidos();
  }

  
  abrirModal(){
    console.log("estoy en abrirModal de app.component.ts");
    this.addPedidoService.mostrarModal();
  }

  abrirModalEditar(pedido : Pedido) {
    this.pedidosService.mostrarModalEdit(pedido);
    console.log("estoy en pedidos.component.ts");
  }

  detallePedido(pedido: Pedido){
    this.pedidosService.mostrarModalDetail(pedido);
  }
  
  getPedidos() {
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
    console.log(pedido);
    this.pedidosService.deletePedido(pedido).subscribe(res => {
      console.log(res);
      this.getPedidos();
    });
  }

  cerrarSesion() {
    this.loginService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { AddPedidoService } from 'src/app/add-pedido/add-pedido-service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(private addPedidoService:AddPedidoService) { }

  ngOnInit(): void {
  }

  abrirModal(){
    console.log("estoy en abrirModal de app.component.ts");
    this.addPedidoService.mostrarModal();
  }

}

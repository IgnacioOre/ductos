import { Component, OnInit } from '@angular/core';
import { BtnPedidoServiceService } from './btn-pedido-service.service';

@Component({
  selector: 'app-btn-pedido',
  templateUrl: './btn-pedido.component.html',
  styleUrls: ['./btn-pedido.component.css']
})
export class BtnPedidoComponent implements OnInit {  
  
  constructor(private btnService: BtnPedidoServiceService) { }

    consulta: any;
    exitenDatos: boolean = false;
    pedidoHallado: any;

   ngOnInit(): void {
    
  }  

  showDiv = {
    info: false,     
  }

  getData(codigo: string){
    console.log("me pulsaron desde la ventada de pedidos para recuperar los clientes y pedidos");
    console.log("El codigo de producto es : " + codigo);     

    this.btnService.getAllData(codigo).subscribe(res => {   
      console.log("soy la res" , res);   
      this.consulta = res;      
      console.log("Soy el estado de producto: " , res.estadoDelPedido);
      
    });
  }
}
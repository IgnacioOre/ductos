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
    pedidoHallado: any;

   ngOnInit(): void {
    
  }  

  showDiv = {
    info: false,     
  }

  getData(){
    console.log("me pulsaron desde la ventada de pedidos para recuperar los clientes y pedidos"); 

    this.btnService.getAllData().subscribe((res: any) => {
      this.consulta = res;
      console.log(this.consulta);
    });
  }
}
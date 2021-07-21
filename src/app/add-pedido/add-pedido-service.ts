import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../IPedido';

@Injectable({
  providedIn: 'root'
})
export class AddPedidoService{

  public oculto: string = '';

  constructor(private http : HttpClient) { }

  ocultarModal() {
    console.log('ocultar modal');
    this.oculto= '';
  }

  mostrarModal(){
    this.oculto = 'block';
    console.log('mostrar modal');
  }

  addPedido(pedido: Pedido) {
    return this.http.post('http://localhost:3000/pedido', pedido);
  }

  enviarEmail(cod: any, corr: any){
    console.log("ESTOY DENTRO DE ADD-PEDIDO-SERVICE EN ENVIAReMAIL");
    console.log("cod: " + cod);
    console.log("corr: " + corr);
    var contenido = {
      codigo: cod, 
      correo: corr
  };
    return this.http.post("http://localhost:3000/sendemail",contenido); 
  }
}

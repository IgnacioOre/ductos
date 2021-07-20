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
  
  addImagen(imagen: any){
    return this.http.post('http://localhost:3000/pedido/:id', imagen);
  }

  generarCodigoDePedido(){

    
  }
}

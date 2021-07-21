import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from 'src/app/IPedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  public oculto : string = '';
  public oculto2 : string = '';
  public pedidoActual : Pedido;
  constructor(private http : HttpClient) { }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get('http://localhost:3000/pedido').pipe(map((res: any) => res.data));
  }

  ocultarModal() {
    console.log('ocultar modal');
    this.oculto= '';
  }

  mostrarModal(pedido : Pedido){
    this.oculto = 'block';
    this.pedidoActual = pedido;
    console.log('mostrar modal');
  }

  mostrarModal2(){
    console.log('mostrar modal2');
    this.oculto2 = 'block';
    
  }

  updatePedido(pedido : Pedido){
    return this.http.put('http://localhost:3000/pedidos', pedido);
  }

  uploadImage(nombre : string, uploadData : FormData) {
    return this.http.post(`http://localhost:3000/upload/pedido/${nombre}`, uploadData);
  }

  deletePedido(pedido: Pedido){
    console.log(pedido);
    const options = {
      body: {
        pedidoId: pedido.pedidoId
      },
    };
    console.log("Estoy en borrarPedido de pedidos.servicet.ts");
    return this.http.delete('http://localhost:3000/pedidos', options);

  }
}

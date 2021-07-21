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

  deletePedido(){
    return this.http.delete('http://localhost:3000/pedido');
  }

  updatePedido(pedido : Pedido){
    return this.http.put('http://localhost:3000/pedidos', pedido);
  }

  uploadImage(nombre : string, uploadData : FormData) {
    return this.http.post(`http://localhost:3000/upload/pedido/${nombre}`, uploadData);
  }
}

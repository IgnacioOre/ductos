import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddPedidoService{

  public oculto: string = '';

  constructor() { }

  ocultarModal() {
    console.log('ocultar modal');
    this.oculto= '';
  }

  mostrarModal(){
    this.oculto = 'block';
    console.log('mostrar modal');
  }
}

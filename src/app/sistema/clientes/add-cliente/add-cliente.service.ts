import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/ICliente';

@Injectable({
  providedIn: 'root'
})
export class AddClienteService {

  public oculto: string = '';

  constructor(private http: HttpClient) { }

  mostrarModal() {
    this.oculto = 'block';
    console.log('mostrar modal');
  }

  ocultarModal() {
    console.log('ocultar modal');
    this.oculto = '';
  }

  addCliente(cliente: Cliente) {
    return this.http.post('http://localhost:3000/cliente?token='+localStorage.getItem('token'), cliente);
  }
}

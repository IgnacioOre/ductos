import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/models/ICliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public ocultoEdit : string = '';
  public ocultoDetail : string = '';
  public clienteActual : Cliente;

  constructor(private http : HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get('http://localhost:3000/cliente?token='+localStorage.getItem('token')).pipe(map((res: any) => res.data));
  }

  ocultarModalEdit() {
    console.log('ocultar modal');
    this.ocultoEdit= '';
  }

  mostrarModalEdit(cliente : Cliente){
    this.ocultoEdit = 'block';
    this.clienteActual = cliente;
    console.log('mostrar modal edit cliente');
  }

  deleteCliente(cliente: Cliente){
    console.log(cliente);
    const options = {
      body: {
        clienteId: cliente.clienteId
      },
    };
    return this.http.delete('http://localhost:3000/clientes?token='+localStorage.getItem('token'), options);

  }

  updateCliente(cliente : Cliente){
    return this.http.put('http://localhost:3000/clientes?token='+localStorage.getItem('token'), cliente);
  }
}

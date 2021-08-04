import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/ICliente';
import { LoginService } from 'src/app/services/login/login.service';
import { AddClienteService } from './add-cliente/add-cliente.service';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientesCargados: boolean = false;
  clientes: Cliente[] = [];

  p: number = 1;
  rol : string = "";

  constructor(public addClienteService:AddClienteService, public clientesService: ClientesService,public loginService : LoginService) { }

  ngOnInit(): void {
    this.getClientes();
    if (localStorage.getItem('rol') != null) {
      this.rol = localStorage.getItem('rol')!;
    }
  }
  
  cerrarSesion() {
    this.loginService.logout();
  }

  abrirModal() {
    console.log("estoy en abrirModal de app.component.ts Clientes");
    this.addClienteService.mostrarModal();
  }

  getClientes() {
    this.clientesService.getClientes().subscribe(res => {
      this.clientes = res;
      console.log(this.clientes);
      this.clientesCargados = true;
    });
  }

  abrirModalEditar(cliente : Cliente) {
    this.clientesService.mostrarModalEdit(cliente);
    console.log("estoy en cliente.component.ts modal editar");
  }

  borrarCliente(cliente : Cliente) {
    console.log(cliente);
    this.clientesService.deleteCliente(cliente).subscribe(res => {
      console.log(res);
      this.getClientes();
    });
  }

  get obtenerFuncion() {
    return this.getClientes.bind(this);
  }
}

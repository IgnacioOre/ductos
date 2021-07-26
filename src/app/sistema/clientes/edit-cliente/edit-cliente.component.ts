import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/ICliente';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  formCliente: FormGroup;
  codigo: String= "";
  clienteActual : Cliente;

  constructor(public clientesService: ClientesService, private formBuilder: FormBuilder) {
    this.formCliente = this.formBuilder.group({
      rut: [this.clientesService.clienteActual?.rut, [Validators.required]],
      nombreCliente: [this.clientesService.clienteActual?.nombreCliente, [Validators.required]],
      apellidoPaterno: [this.clientesService.clienteActual?.apellidoPaterno, [Validators.required]],
      apellidoMaterno: [this.clientesService.clienteActual?.apellidoMaterno, [Validators.required]],
      email: [this.clientesService.clienteActual?.email,[Validators.required]],
      telefono: [this.clientesService.clienteActual?.telefono, [Validators.required]],
      direccion : [this.clientesService.clienteActual?.direccion ,[Validators.required]]
    });
    this.clienteActual = this.clientesService.clienteActual;
   }

  ngOnInit(): void {
  }

  saveData(){
    console.log(this.formCliente.get('estadoDelCliente')?.value);
    this.clienteActual.rut = this.formCliente.get('rut')?.value;
    this.clienteActual.nombreCliente = this.formCliente.get('nombreCliente')?.value;
    this.clienteActual.apellidoPaterno = this.formCliente.get('apellidoPaterno')?.value;
    this.clienteActual.apellidoMaterno = this.formCliente.get('apellidoMaterno')?.value;
    this.clienteActual.email = this.formCliente.get('email')?.value;
    this.clienteActual.telefono = this.formCliente.get('telefono')?.value;
    this.clienteActual.direccion = this.formCliente.get('direccion')?.value;


    console.log(this.clienteActual);
    this.clientesService.updateCliente(this.clienteActual).subscribe(res =>{
      console.log(res);
    });
    this.ocultarModalEdit();
  }
  
  ocultarModalEdit(){
    this.clientesService.ocultarModalEdit();
  }
}

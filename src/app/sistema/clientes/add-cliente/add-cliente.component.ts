import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/ICliente';
import { AddClienteService } from './add-cliente.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {

  formCliente: FormGroup;

  @Input() getClientes: Function;
  
  @Output()
  added = new EventEmitter<string>();

  constructor(public addClienteService: AddClienteService, private formBuilder: FormBuilder) {
    this.formCliente = this.formBuilder.group({

      rut: ['', [Validators.required]],
      nombreCliente: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]]

    });
  }

  ngOnInit(): void {
  }
  saveData() {
    var cliente: Cliente = this.formCliente.value;

    this.addClienteService.addCliente(cliente).subscribe(res => {
      console.log(res);
      this.getClientes();
      this.formCliente = this.formBuilder.group({
        rut: ['', [Validators.required]],
        nombreCliente: ['', [Validators.required]],
        apellidoPaterno: ['', [Validators.required]],
        apellidoMaterno: ['', [Validators.required]],
        email: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        direccion: ['', [Validators.required]]
      });
    });
  }
  ocultarModal() {
    this.addClienteService.ocultarModal();
  }
}

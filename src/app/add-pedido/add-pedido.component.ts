import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from '../IPedido';
import { AddPedidoService } from './add-pedido-service';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  styleUrls: ['./add-pedido.component.css']
})
export class AddPedidoComponent implements OnInit {

  formPedido: FormGroup;

  constructor(public addPedidoService: AddPedidoService, private formBuilder: FormBuilder) { 
    this.formPedido = this.formBuilder.group({
      fechaDeIngreso: ['',[Validators.required]],
      fechaDeEntrega: ['',[Validators.required]],
      estado: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      presupuesto: ['',[Validators.required]],
      correo : ['',[Validators.required]],
      indicaciones: ['',[Validators.required]]
    });
  }

  saveData(){
    var pedido: Pedido = this.formPedido.value;
    console.log(pedido);
    this.addPedidoService.addPedido(pedido).subscribe(res =>{
      console.log(res);
    });
  }

  ngOnInit(): void {
  }

  ocultarModal(){
    this.addPedidoService.ocultarModal();
  }
}
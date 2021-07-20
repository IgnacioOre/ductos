import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { MostrarConfirmacionService } from '../confirmacion/mostrar-confirmacion.service';
import { Pedido } from '../IPedido';
import { AddPedidoService } from './add-pedido-service';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  styleUrls: ['./add-pedido.component.css']
})
export class AddPedidoComponent implements OnInit {

  formPedido: FormGroup;
  codigo: String= "";

  constructor(public addPedidoService: AddPedidoService, private formBuilder: FormBuilder, public mostrarConfirmacionService: MostrarConfirmacionService) { 
    this.formPedido = this.formBuilder.group({
      codigo: this.generarCodigo(),
      nombreCliente: ['',[Validators.required]],
      correo : ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      fechaDeIngreso: ['',[Validators.required]],
      fechaDeEntrega: ['',[Validators.required]],
      nombrePedido: ['',[Validators.required]],
      presupuesto: ['',[Validators.required]],
      estadoDelPedido: ['',[Validators.required]],
      estadoDePago: ['',[Validators.required]],
      abono:['',[Validators.required]],
      indicaciones: ['',[Validators.required]],
      URLImagen:""
    });
  }

  saveData(){
    var pedido: Pedido = this.formPedido.value;
    console.log(pedido);
    this.addPedidoService.addPedido(pedido).subscribe(res =>{
      console.log(res);
    });
    this.ocultarModal();
  }

  ngOnInit(): void {
  }

  ocultarModal(){
    this.addPedidoService.ocultarModal();
    //this.mostrarConfirmacionService.mostrarMensaje("Éxito!","Se ha añadido el pedido con éxito");
  }

  rand_Code(chars: any, lon: any):String{
    let code="";
    for(let x=0; x<lon; x++){
      let rand = Math.floor(Math.random() * chars.length);
      code += chars.substr(rand,1);
    }
    return code;
  }

  generarCodigo():string{
    return this.rand_Code('0123456789',6) + '' +this.rand_Code('ABCDEFGHIJKMNOPQRSTUVWXYZ',2);
  }

  mostrarMensaje(){
    console.log("El codigo es:"+this.formPedido.controls['codigo'].value);
    console.log("Estoy dentro de mostrar mensaje app component");
    this.mostrarConfirmacionService.mostrarModal(this.formPedido.controls['codigo'].value);
  }

}
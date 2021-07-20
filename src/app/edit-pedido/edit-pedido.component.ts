import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MostrarConfirmacionService } from '../confirmacion/mostrar-confirmacion.service';
import { PedidosService } from '../sistema/pedidos/pedidos.service';

@Component({
  selector: 'app-edit-pedido',
  templateUrl: './edit-pedido.component.html',
  styleUrls: ['./edit-pedido.component.css']
})
export class EditPedidoComponent implements OnInit {

  formPedido: FormGroup;
  codigo: String= "";

  constructor(public pedidosService: PedidosService, private formBuilder: FormBuilder, public mostrarConfirmacionService: MostrarConfirmacionService) { 
    this.formPedido = this.formBuilder.group({
      codigo: ['',[Validators.required]],
      fechaDeIngreso: ['',[Validators.required]],
      fechaDeEntrega: ['',[Validators.required]],
      estado: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      presupuesto: ['',[Validators.required]],
      correo : ['',[Validators.required]],
      indicaciones: ['',[Validators.required]],
      URLImagen:""
    });
    this.fillData();
  }

  ngOnInit(): void {
    this.fillData();
  }

  ngAfterViewInit() {
    this.fillData();
  }

  fillData() {
    console.log(new Date(this.pedidosService.pedidoActual?.fechaIngreso));
    this.formPedido.get('fechaDeIngreso')?.setValue(formatDate(this.pedidosService.pedidoActual?.fechaIngreso,'yyyy-MM-dd','en'));
    if (this.pedidosService.pedidoActual.fechaEntrega) {
      this.formPedido.get('fechaDeEntrega')?.setValue(formatDate(this.pedidosService.pedidoActual?.fechaEntrega,'yyyy-MM-dd','en'));
    }
    this.formPedido.get('estado')?.setValue(this.pedidosService.pedidoActual?.estado);
    this.formPedido.get('presupuesto')?.setValue(this.pedidosService.pedidoActual?.presupuesto);
    this.formPedido.get('indicaciones')?.setValue(this.pedidosService.pedidoActual?.indicaciones);
    this.formPedido.get('correo')?.setValue(this.pedidosService.pedidoActual.email);
    this.formPedido.get('telefono')?.setValue(this.pedidosService.pedidoActual.telefono);
  }

  ocultarModal(){
    this.pedidosService.ocultarModal();
    //this.mostrarConfirmacionService.mostrarMensaje("Éxito!","Se ha añadido el pedido con éxito");
  }

  mostrarMensaje(){
    console.log("El codigo es:"+this.formPedido.controls['codigo'].value);
    console.log("Estoy dentro de mostrar mensaje app component");
    this.mostrarConfirmacionService.mostrarModal(this.formPedido.controls['codigo'].value);
  }

}

import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { MostrarConfirmacionService } from '../confirmacion/mostrar-confirmacion.service';
import { Pedido } from '../IPedido';
import { PedidosService } from '../sistema/pedidos/pedidos.service';
import { AddPedidoService } from './add-pedido-service';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  styleUrls: ['./add-pedido.component.css']
})
export class AddPedidoComponent implements OnInit {

  formPedido: FormGroup;
  codigo: String= "";
  public archivos: any = [];
  public previsualizacion: string='';
  id: string="nombre";
  nombre: string ="";
  url: string ="";

  @Input() getPedidos: Function;
  

  @Output()
  added = new EventEmitter<string>();

  constructor(public addPedidoService: AddPedidoService, private formBuilder: FormBuilder, 
    public mostrarConfirmacionService: MostrarConfirmacionService, private http: HttpClient,
    public _DomSanitizationService: DomSanitizer, public router : Router) { 
    this.formPedido = this.formBuilder.group({
      codigo: this.generarCodigo(),
      nombreCliente: ['',[Validators.required]],
      correo : ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      fechaDeIngreso: [new Date(Date.now()).toISOString().split('T')[0],[Validators.required]],
      fechaDeEntrega: ['',[Validators.required]],
      nombrePedido: ['',[Validators.required]],
      presupuesto: ['',[Validators.required]],
      estadoDelPedido: ['',[Validators.required]],
      estadoDePago: ['',[Validators.required]],
      abono:['',[Validators.required]],
      indicaciones: ['',[Validators.required]],
      URLImagen: ['localhost:3000/pedidos/',[Validators.required]]
      
    });
    console.log(new Date(Date.now()).toISOString());
  }

  addedPedido() {
    this.added.emit('Agregado');
  }

  saveData(){
    var pedido: Pedido = this.formPedido.value;
    console.log(pedido);
    this.addPedidoService.addPedido(pedido).subscribe(res =>{
      console.log(res);
      this.getPedidos();
      this.formPedido.reset();
      this.formPedido.get('fechaDeIngreso')?.setValue(new Date(Date.now()).toISOString().split('T')[0]);
    });
    
    this.ocultarModal();
  }

  capturarFile(event:any): any {
    
    const archivoCapturado = event.target.files[0];
    console.log("archivo Capturadooo", archivoCapturado);
    this.nombre = archivoCapturado.name;
    console.log("nombre", this.nombre);
    this.url = `localhost:3000/pedidos/${this.nombre}`;
    console.log("La url", this.url);
    const uploadData = new FormData;
    uploadData.append('archivos', archivoCapturado, archivoCapturado.name);

    var imagen : Pedido = this.formPedido.get('URLImagen')?.value;
    this.http.post(`http://localhost:3000/upload/pedido/${this.nombre}`, uploadData).subscribe((res: any) =>{
      
      this.formPedido.get('URLImagen')?.setValue(`${res.path}`); 
      this.previsualizacion = res.path; 
      console.log(res);

      console.log("Este es res path", res.path);
      
    });

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
    //this.enviarEmailService.sendMail();
    //console.log("Estoy dentro de generarCodigo");
    var texto = {
      //correo: this.formPedido.controls['correo'].value,
      //codigo: this.formPedido.controls['codigo'].value
    }
    return this.rand_Code('0123456789',6) + '' +this.rand_Code('ABCDEFGHIJKMNOPQRSTUVWXYZ',2);
  
  }

  mostrarMensaje(){
    console.log("El codigo es:"+this.formPedido.controls['codigo'].value);
    console.log("Estoy dentro de mostrar mensaje app component");
    this.mostrarConfirmacionService.mostrarModal(this.formPedido.controls['codigo'].value);
  }

  enviarCorreo(){
    this.addPedidoService.enviarEmail(this.formPedido.controls['codigo'].value,this.formPedido.controls['correo'].value).subscribe(res =>{
      console.log("ESTOY DENTRO DE ADD-PEDIDO.COMPONENT EN EL METODO GENERARCODIGO")
      console.log(res);
      console.log("ESTOY SALIENDO")
    });
  }
   

}
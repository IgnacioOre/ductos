import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Insumo } from 'src/app/models/IInsumo';
import { InsumosService } from './insumos.service';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {
  insumos : Insumo[];
  insumosCargados : boolean;
  p : number = 0;

  constructor(public insumosService : InsumosService, public _DomSanitizationService : DomSanitizer) { }

  ngOnInit(): void {
    this.getInsumos();
  }

  getInsumos() {
    this.insumosService.getInsumos().subscribe( res => {
      this.insumos = res
      this.insumosCargados = true;
      console.log(this.insumos);
    });

  }

  get obtenerFuncion() {
    return this.getInsumos.bind(this);
  }

  abrirModal(){
    console.log("estoy en abrirModal de app.component.ts");
    this.insumosService.mostrarModalAdd();
  }

  abrirModalEditar(insumo : Insumo) {
    this.insumosService.mostrarModalEdit(insumo);
    console.log("estoy en pedidos.component.ts");
  }

  borrarInsumo(insumo : Insumo) {
    this.insumosService.deleteInsumo(insumo).subscribe(res => {
      console.log("Insumo borrado");
      this.getInsumos();
    })
  };
  

}

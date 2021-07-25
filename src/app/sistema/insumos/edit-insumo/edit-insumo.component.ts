import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Insumo } from 'src/app/models/IInsumo';
import { InsumosService } from '../insumos.service';

@Component({
  selector: 'app-edit-insumo',
  templateUrl: './edit-insumo.component.html',
  styleUrls: ['./edit-insumo.component.css']
})
export class EditInsumoComponent implements OnInit {

  formInsumo: FormGroup;
  codigo: String= "";
  insumoActual : Insumo;
  public previsualizacion: string;

  constructor(public _DomSanitizationService: DomSanitizer, public insumosService: InsumosService, private formBuilder: FormBuilder) { 
    this.insumoActual = insumosService.insumoActual;
    this.formInsumo = this.formBuilder.group({
      insumoCodigo: [{value: this.insumoActual.insumoCodigo, disabled:true}, [Validators.required]],
      insumoNombre: [this.insumoActual.insumoNombre,[Validators.required]],
      imagenUrl: ['',[Validators.required]],
      cantidad: [this.insumoActual.cantidad, [Validators.required]]
    });
    this.insumoActual = this.insumosService.insumoActual;
    this.previsualizacion = this.insumoActual.imagenUrl;
    
  }

  ngOnInit(): void {
    
  }

  saveData(){
    console.log(this.formInsumo.get('estadoDelPedido')?.value);
    this.insumoActual.insumoNombre = this.formInsumo.get('insumoNombre')?.value;
    this.insumoActual.insumoCodigo = this.formInsumo.get('insumoCodigo')?.value;
    this.insumoActual.imagenUrl = this.formInsumo.get('imagenUrl')?.value;
    this.insumoActual.cantidad = this.formInsumo.get('cantidad')?.value;
    if (this.previsualizacion) {
      this.insumoActual.imagenUrl = this.previsualizacion;
    }
    this.insumosService.updateInsumo(this.insumoActual).subscribe(res =>{
      console.log(res);
    });
    this.ocultarModalEdit();
  }

  capturarFile(event:any): any {
    
    const archivoCapturado = event.target.files[0];
    console.log("archivo Capturadooo", archivoCapturado);
    const uploadData = new FormData;
    uploadData.append('archivos', archivoCapturado, archivoCapturado.name);
    this.insumosService.uploadImage(archivoCapturado.name, uploadData).subscribe((res: any) =>{
       
      this.previsualizacion = res.path; 
      console.log(res);

      console.log("Este es res path", res.path);
      
    });

  }

  ocultarModalEdit(){
    this.insumosService.ocultarModalEdit();
  }

}

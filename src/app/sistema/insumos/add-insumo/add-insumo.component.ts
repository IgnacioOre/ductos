import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Insumo } from 'src/app/models/IInsumo';
import { Pedido } from 'src/app/models/IPedido';
import { MostrarConfirmacionService } from '../../pedidos/confirmacion/mostrar-confirmacion.service';
import { InsumosService } from '../insumos.service';

@Component({
  selector: 'app-add-insumo',
  templateUrl: './add-insumo.component.html',
  styleUrls: ['./add-insumo.component.css']
})
export class AddInsumoComponent implements OnInit {
  formInsumo: FormGroup;
  codigo: String = "";
  public archivos: any = [];
  public previsualizacion: string = '';
  id: string = "nombre";
  nombre: string = "";
  url: string = "";

  @Input() getInsumos: Function;

  constructor(public insumosService: InsumosService, private formBuilder: FormBuilder,
    public mostrarConfirmacionService: MostrarConfirmacionService, private http: HttpClient,
    public _DomSanitizationService: DomSanitizer, public router: Router) {
    this.formInsumo = this.formBuilder.group({
      insumoCodigo: [{value: this.generarCodigo(), disabled:true}, [Validators.required]],
      insumoNombre: ['',[Validators.required]],
      imagenUrl: ['',[Validators.required]],
      cantidad: ['',[Validators.required]]
    });
  }

  saveData() {
    var insumo: Insumo = this.formInsumo.value;
    insumo.insumoCodigo = this.formInsumo.get('insumoCodigo')?.value;
    console.log(insumo);
    if (this.previsualizacion) {
      insumo.imagenUrl = this.previsualizacion;
    }
    this.getInsumos();
    this.insumosService.addInsumo(insumo).subscribe(res => {
      console.log(res);
      this.getInsumos();
      this.previsualizacion = "";
      this.formInsumo = this.formBuilder.group({
        insumoCodigo: [{value: this.generarCodigo(), disabled:true}, [Validators.required]],
        insumoNombre: ['',[Validators.required]],
        imagenUrl: ['',[Validators.required]],
        cantidad: ['',[Validators.required]]
      });
    });

    this.ocultarModal();
  }

  capturarFile(event: any): any {

    const archivoCapturado = event.target.files[0];
    console.log("archivo Capturadooo", archivoCapturado);
    this.nombre = archivoCapturado.name;
    console.log("nombre", this.nombre);
    const uploadData = new FormData;
    uploadData.append('archivos', archivoCapturado, archivoCapturado.name);
    this.insumosService.uploadImage(archivoCapturado.name, uploadData).subscribe((res: any) => {
      
      this.previsualizacion = res.path;
      console.log(res);
      console.log("Este es res path", res.path);

    });

  }

  ngOnInit(): void {
  }

  ocultarModal() {
    this.insumosService.ocultarModalAdd();
  }

  rand_Code(chars: any, lon: any): String {
    let code = "";
    for (let x = 0; x < lon; x++) {
      let rand = Math.floor(Math.random() * chars.length);
      code += chars.substr(rand, 1);
    }
    return code;
  }

  generarCodigo(): string {
    return this.rand_Code('ABCDEFGHIJKMNOPQRSTUVWXYZ', 3) + '-' + this.rand_Code('0123456789', 3);
  }


}
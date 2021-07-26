import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/IProducto';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent implements OnInit {

  @Input() getProductos: Function;

  @Output()
  added = new EventEmitter<string>();

  formProducto: any;
  codigo: string = "";

  public archivos: any = [];
  public previsualizacion: string = '';
  id: string = "nombre";
  url: string = "";

  constructor(public productosService: ProductosService,  private formBuilder: FormBuilder, private http: HttpClient,
    public _DomSanitizationService: DomSanitizer, public router: Router) {

    this.formProducto = this.formBuilder.group({
      nombreProducto: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagenProducto: ['', [Validators.required]]

    });
    //console.log(new Date(Date.now()).toISOString());
  }

  addedProducto() {
    this.added.emit('Agregado');
  }

  saveData() {
    var producto: Producto = this.formProducto.value;
    if (this.previsualizacion) {
      producto.imagenProducto = this.previsualizacion;
    }
    console.log(producto);
    this.productosService.addProducto(producto).subscribe(res => {
      console.log(res);
      this.getProductos();
      this.previsualizacion = "";
      this.formProducto = this.formBuilder.group({
        nombreProducto: ['', [Validators.required]],
        precio: ['', [Validators.required]],
        cantidad: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        imagenProducto: ['', [Validators.required]]
      });
    });
    this.ocultarModal();
    console.log(this.formProducto.controls);
  }

  capturarFile(event: any): any {

    const archivoCapturado = event.target.files[0];
    console.log("archivo Capturadooo", archivoCapturado);
    this.nombre = archivoCapturado.name;
    console.log("nombre", this.nombre);
    const uploadData = new FormData;
    uploadData.append('archivos', archivoCapturado, archivoCapturado.name);
    this.http.post(`http://localhost:3000/upload/producto/${archivoCapturado.name}?token=${localStorage.getItem('token')}`, uploadData).subscribe((res: any) => {

      this.previsualizacion = res.path;
      console.log(res);
      console.log("Este es res path", res.path);

    });

  }
  nombre(arg0: string, nombre: any) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  ocultarModal() {
    this.productosService.ocultarModalAdd();
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
    return this.rand_Code('0123456789', 6) + '' + this.rand_Code('ABCDEFGHIJKMNOPQRSTUVWXYZ', 2);
  }

  mostrarMensaje() {
    
    console.log("El codigo es:" + this.formProducto.controls['codigo'].value);
    //this.mostrarConfirmacionService.mostrarModal(this.formProducto.controls['codigo'].value);

  }

  agregarInsumos(){
    this.productosService.mostrarModalAgregarInsumos();
  }

}



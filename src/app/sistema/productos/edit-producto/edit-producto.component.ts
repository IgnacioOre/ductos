import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from 'src/app/models/IProducto';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit {

  formProducto: FormGroup;
  codigo: String = "";
  productoActual: Producto;
  public previsualizacion: string;

  constructor(public _DomSanitizationService: DomSanitizer, public productosService: ProductosService, private formBuilder: FormBuilder) {
    this.productoActual = productosService.productoActual;
    this.formProducto = this.formBuilder.group({

      nombreProducto: [this.productoActual.nombreProducto, [Validators.required]],
      precio: [this.productoActual.valorProducto, [Validators.required]],
      cantidad: [this.productoActual.cantidadProducto, [Validators.required]],
      descripcion: [this.productoActual.descripcionProducto, [Validators.required]],
      imagenProducto: ['', [Validators.required]],
    });
    this.productoActual = this.productosService.productoActual;
    this.previsualizacion = this.productoActual.imagenProducto;
  }

  ngOnInit(): void {

  }

  saveData() {
    //console.log(this.formProducto.get('estadoDelPedido')?.value);

    this.productoActual.nombreProducto = this.formProducto.get('nombreProducto')?.value;
    this.productoActual.valorProducto = this.formProducto.get('precio')?.value;
    this.productoActual.cantidadProducto = this.formProducto.get('cantidad')?.value;
    this.productoActual.descripcionProducto = this.formProducto.get('descripcion')?.value;
  

    if (this.previsualizacion) {
      this.productoActual.imagenProducto = this.previsualizacion;
    }
    this.productosService.updateProducto(this.productoActual).subscribe(res => {
      console.log(res);
    });
    this.ocultarModalEdit();
  }

  capturarFile(event: any): any {

    const archivoCapturado = event.target.files[0];
    console.log("archivo Capturadooo", archivoCapturado);
    const uploadData = new FormData;
    uploadData.append('archivos', archivoCapturado, archivoCapturado.name);
    this.productosService.uploadImage(archivoCapturado.name, uploadData).subscribe((res: any) => {

      this.previsualizacion = res.path;
      console.log(res);

      console.log("Este es res path", res.path);

    });

  }

  ocultarModalEdit() {
    this.productosService.ocultarModalEdit();
  }

}


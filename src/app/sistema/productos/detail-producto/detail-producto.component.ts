import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from 'src/app/models/IProducto';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-detail-producto',
  templateUrl: './detail-producto.component.html',
  styleUrls: ['./detail-producto.component.css']
})
export class DetailProductoComponent implements OnInit {

  formProducto: FormGroup;
  codigo: String = "";
  productoActual: Producto;
  public previsualizacion: string = '';

  constructor(public productosService: ProductosService, public _DomSanitizationService: DomSanitizer,
    private formBuilder: FormBuilder) {

    this.formProducto = this.formBuilder.group({
      nombreProducto: [this.productosService.productoActual?.nombreProducto, [Validators.required]],
      precio: [this.productosService.productoActual?.valorProducto, [Validators.required]],
      cantidad: [this.productosService.productoActual?.cantidadProducto, [Validators.required]],
      descripcion: [this.productosService.productoActual?.descripcionProducto, [Validators.required]],
      imagenProducto: ['', [Validators.required]]
    });

    this.productoActual = this.productosService.productoActual;
    //this.previsualizacion = this.productoActual.imagenProducto;

  }

  ngOnInit(): void { }


  ocultarModalEdit() {
    this.productosService.ocultarModalDetail();
  }
}

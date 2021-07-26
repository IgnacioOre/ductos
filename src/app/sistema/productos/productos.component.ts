import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/IProducto';
import { ProductosService } from './productos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productosCargados:boolean= false;
  productos: Producto[] = [];
  p: number = 1;


  constructor(public productosService: ProductosService,public _DomSanitizationService : DomSanitizer) { }

  ngOnInit(): void {
    this.getProductos();
  }
  
  abrirModal(){
    this.productosService.mostrarModalAdd();
  }

  abrirModalEditar(producto: Producto) {
    this.productosService.mostrarModalEdit(producto);
  }

  detalleProductos(producto: Producto){
    this.productosService.mostrarModalDetail(producto);
  }
  
  getProductos() {
      this.productosService.getProductos().subscribe(res => {
      this.productos = res;
      console.log(this.productos);
      this.productosCargados = true;
    });
  }

  revisarProducto(event : Event) {
    this.getProductos();
  }

  get obtenerFuncion() {
    return this.getProductos.bind(this);
  }
  
  borrarProducto(producto: Producto) {
    console.log(producto);
    this.productosService.deleteProducto(producto).subscribe(res => {
      console.log(res);
      this.getProductos();
    });
  }
}

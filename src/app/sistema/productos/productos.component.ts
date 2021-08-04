import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/IProducto';
import { ProductosService } from './productos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productosCargados:boolean= false;
  productos: Producto[] = [];
  p: number = 1;
  rol : string = "";

  constructor(public productosService: ProductosService,
    public _DomSanitizationService : DomSanitizer,
    public loginService: LoginService ) { }

  ngOnInit(): void {
    this.getProductos();
    if (localStorage.getItem('rol') != null) {
      this.rol = localStorage.getItem('rol')!;
    }
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

  cerrarSesion(){
    this.loginService.logout();
  }
}

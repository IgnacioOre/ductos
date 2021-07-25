import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Producto } from 'src/app/models/IProducto';
import { AddProductoService } from './add-producto-service';
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productosCargados:boolean= false;
  productos: Producto[] = [];
  p: number = 1;


  constructor(public addProductoService: AddProductoService, public productosService: ProductosService,
    public loginService : LoginService) { }

  ngOnInit(): void {
  }
  
  abrirModal(){
    this.addProductoService.mostrarModal();
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
    this.productosService.deletePedido(producto).subscribe(res => {
      console.log(res);
      this.getProductos();
    });
  }

  cerrarSesion() {
    this.loginService.logout();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/models/IProducto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public ocultoEdit : string = '';
  //public ocultoDetail : string = '';
  public productoActual : Producto;
  ocultoDetail: string;
  ocultoAdd: string;
  pedidoActual: any;
  ocultoAgregarInsumo: string = '';
  productos: Producto[]=[];

  
  constructor(private http : HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get('http://localhost:3000/producto?token='+localStorage.getItem('token')).pipe(map((res: any) => res.data));
  }

  mostrarModalAdd(){
    this.ocultoAdd = 'block';
    console.log('mostrar modal');
  }

  ocultarModalAdd() {
    console.log('ocultar modal');
    this.ocultoAdd= '';
  }

  ocultarModalEdit() {
    console.log('ocultar modal');
    this.ocultoEdit= '';
  }

  mostrarModalEdit(producto : Producto){
    this.ocultoEdit = 'block';
    this.productoActual = producto;
    console.log('mostrar modal');
  }

  ocultarModalDetail() {
    console.log('ocultar modal');
    this.ocultoDetail= '';
  }

  mostrarModalDetail(producto : Producto){
    this.ocultoDetail = 'block';
    this.productoActual = producto;
    console.log('mostrar modal');
  }

  mostrarModalAgregarInsumos(){
    this.ocultoAgregarInsumo = 'block';
    console.log('mostrar modal agregarInsumos');
  }

  ocultarModalAgregarInsumos(){
    this.ocultoAgregarInsumo = '';
    console.log('ocultar modal agregarInsumos');
  }



  updateProducto(producto : Producto){
    return this.http.put('http://localhost:3000/productos?token='+localStorage.getItem('token'), producto);
  }

  uploadImage(nombre : string, uploadData : FormData) {
    return this.http.post(`http://localhost:3000/upload/producto/${nombre}?token=${localStorage.getItem('token')}`, uploadData);
  }

  deleteProducto(producto : Producto){
    console.log(producto);
    const options = {
      body: {
        productoId: producto.productoId
      },
    };
    return this.http.delete('http://localhost:3000/productos?token='+localStorage.getItem('token'), options);

  }

  addProducto(producto: Producto){
    console.log("Estoy en addProducto productoService");
    return this.http.post('http://localhost:3000/producto?token='+localStorage.getItem('token'), producto);
  }


  

}


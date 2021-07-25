import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/IProducto';

@Injectable({
  providedIn: 'root'
})
export class AddProductoService {

  oculto: string = "";

  constructor(private http: HttpClient) { }

  ocultarModal() {
    console.log('ocultar modal');
    this.oculto = '';
  }

  mostrarModal() {
    this.oculto = 'block';
    console.log('mostrar modal');
  }

  addProducto(producto: Producto) {
    return this.http.post('http://localhost:3000/producto?token=' + localStorage.getItem('token'), producto);
  }

  addImagen(imagen: any) {
    return this.http.post('http://localhost:3000/producto/:id?token=' + localStorage.getItem('token'), imagen);
  }
}

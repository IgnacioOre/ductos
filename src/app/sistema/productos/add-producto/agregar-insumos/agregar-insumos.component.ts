import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/IProducto';
import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-agregar-insumos',
  templateUrl: './agregar-insumos.component.html',
  styleUrls: ['./agregar-insumos.component.css']
})
export class AgregarInsumosComponent implements OnInit {

  _listFilter: string;
  filteredProductos: Producto[];
  productosArr: Producto[];

  constructor(public productosService: ProductosService) { }

  ngOnInit(): void {
    


  }

  ocultarModal() {
    this.productosService.ocultarModalAgregarInsumos();
  }

  

get listFilter(): string{
  return this._listFilter;
}

/*

set listFilter(value:string){
  this._listFilter= value;
  console.log(this._listFilter);
  this.productosService.filteredProductos = 
      this.listFilter ? this.performFilter(this.listFilter) :
            this.productosService.productos;
}

performFilter(filterBy: string): Producto[]{
  filterBy = filterBy.toLocaleLowerCase(); //Convertir filterBy a minuscula
  return this.productosService.productos.filter((producto: Producto) =>
    producto.productoId.toLocaleLowerCase().indexOf(filterBy) !== -1);
}//retorna nuevo arreglo filtrado
*/

}

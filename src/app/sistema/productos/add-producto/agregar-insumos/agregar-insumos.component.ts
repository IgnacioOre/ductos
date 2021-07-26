import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Insumo } from 'src/app/models/IInsumo';
import { InsumoProducto } from 'src/app/models/InsumoProductos';
import { Producto } from 'src/app/models/IProducto';
import { InsumosService } from 'src/app/sistema/insumos/insumos.service';
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
  insumosCargados: boolean = false
  insumos: Insumo[];
  formInsumoProductos: any;


  constructor(public productosService: ProductosService, public insumosService: InsumosService,
    private formBuilder: FormBuilder) { 

    this.formInsumoProductos = this.formBuilder.group({
      //nombreProducto: ['', [Validators.required]],
      //insumoNombre: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      //insumos: this.formBuilder.array([])
    });

    console.log(this.formInsumoProductos);

  }

  ngOnInit(): void {
    console.log("Estoy dentro de ngOnit()");
    this.getInsumos();
  }

  ocultarModal() {
    this.productosService.ocultarModalAgregarInsumos();
  }

  saveData() {
    /*var InsumoProducto: InsumoProducto = this.formInsumoProductos.value;
    console.log(InsumoProducto);
    this.productosService.addInsumo(insumo).subscribe(res => {
      console.log(res);
      this.getInsumos();
      this.formInsumoProductos = this.formBuilder.group({
     //   nombreProducto: ['', [Validators.required]],
      //insumoNombre: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      });
    });
    this.ocultarModal();*/


    this.formInsumoProductos = this.formBuilder.group({
      //nombreProducto: ['', [Validators.required]],
      insumoNombre: ['', [Validators.required]],
      //cantidad: ['', [Validators.required]],
    });

    console.log("ESTOY EN  saveData");
    console.log(this.formInsumoProductos);
    
    console.log("INSUMONOMBRE");
    console.log("Estoo " +this.formInsumoProductos.controls['insumoNombre'].value);


  }

  /*agregarInsumos(){
    const insumosProductoFormGroup = this.formBuilder.group({
      nombreInsumo: '',
      cantidad: ''
    });
    this.insumos.push(insumosProductoFormGroup );
  }*/

  getInsumos() {
    this.insumosService.getInsumos().subscribe(res => {
      this.insumos = res;
      console.log("Estoy dentro de getInsumos");
      console.log(this.insumos);
      this.insumosCargados = true;
    });
  }



  /*
  get listFilter(): string{
    return this._listFilter;
  }
  
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

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

  formInsumos: any;
  insumosCargados: boolean = false;
  insumosDisponibles: Insumo[] = [];
  arrNombreInsumos: any = [];
  nombreProducto: string = '';


  constructor(public productosService: ProductosService, public insumosService: InsumosService,
    private formBuilder: FormBuilder) {
    this.formInsumos = this.formBuilder.group({
      nombre: this.formBuilder.array([])
    });
  }


  toggle(event: any) {
    console.log(event);
    console.log(event.srcElement.defaultValue);
    console.log(event.path[0].checked);
    if (event.path[0].checked) {
      this.arrNombreInsumos.push(event.path[0].defaultValue);
    } else {
      this.arrNombreInsumos.pop(event.path[0].defaultValue);
    }
  }

  guardar() {
    console.log(this.arrNombreInsumos);
    this.productosService.ocultoAgregarInsumo = '';
    this.productosService.mostrarModalAdd();
  }

  obtenerNombreProducto() {
    this.nombreProducto = this.productosService.getNombre();
    console.log("NOMBRE DEL PRODUCTO");
    console.log(this.nombreProducto);
  }


  //Cuando se aprete guardar se creare un nuevo formulario

  agregarInsumos() {
    const insumosFormGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]]
    });
    //Se agregara un pequeño formulario
    this.formInsumos.push(insumosFormGroup);
  }



  ngOnInit() {
    this.getInsumosDeLaBaseDeDatos();
  }

  getInsumosDeLaBaseDeDatos() {
    this.insumosService.getInsumos().subscribe(res => {
      this.insumosDisponibles = res;
      this.nombreProducto = this.productosService.getNombre();
      console.log("NOMBRE DEL PRODUCTO");
      console.log(this.nombreProducto);
      console.log("INSUMOS DISPONIBLES");
      console.log(this.insumosDisponibles);
      this.insumosCargados = true;
      
    });
  }

  recuperarDatos(item: any) {
    console.log(item);
  }
}


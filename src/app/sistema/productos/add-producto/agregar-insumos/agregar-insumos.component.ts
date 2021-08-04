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
export class AgregarInsumosComponent implements OnInit, OnChanges {

  formInsumos: any;
  insumosCargados: boolean = false;
  insumosDisponibles: Insumo[] = [];
  arrNombreInsumos: any = [];
  arrCantidadInsumos: any = [];
  nombreProducto: string = '';
  cantidad: any;
  seMarco: boolean = false;
  idProducto: any;


  constructor(public productosService: ProductosService, public insumosService: InsumosService,
    private formBuilder: FormBuilder) {
    this.formInsumos = this.formBuilder.group({
      cantidad: this.formBuilder.array([])
    });
  }


  toggle(event: any) {
    //console.log(event);

    //console.log(event.srcElement.defaultValue);
    //console.log(event.path[0].checked);
    if (event.path[0].checked) {
      //console.log(event.path[0].defaultValue);
      this.seMarco = true;
      this.arrNombreInsumos.push(event.path[0].defaultValue);

    } else {
      this.seMarco = false;
      //console.log("SE SACO DEL ARREGLO");
      this.arrNombreInsumos.pop();
      this.arrCantidadInsumos.pop();

    }
  }

  //[disabled]="isDisabled"

  capturar(event: any, cantidad: any) {
    //console.log("EVENTOOOOOOOOO" + event.srcElement.isConnected);
    //console.log(event);
    console.log("Cantidad" + cantidad);
    this.arrCantidadInsumos.push(cantidad);
  }

  guardar() {
    console.log("ARREGLO ID INSUMOS");
    console.log(this.arrNombreInsumos);
    console.log("ARREGLO CANTIDAD INSUMOS");
    console.log(this.arrCantidadInsumos);
    this.productosService.ocultoAgregarInsumo = '';
    this.productosService.mostrarModalAdd();
  }

  obtenerNombreProducto() {
    this.nombreProducto = this.productosService.getNombre();
    this.idProducto = this.productosService.getId();
    console.log("NOMBRE DEL PRODUCTO");
    console.log(this.nombreProducto);
  }

  //Cuando se aprete guardar se creare un nuevo formulario
  agregarInsumos() {
    const insumosFormGroup = this.formBuilder.group({
      cantidad: ['', [Validators.required]]
    });
    //Se agregara un pequeño formulario
    this.formInsumos.push(insumosFormGroup);
  }


  ngOnChanges() {

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


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Insumo } from 'src/app/models/IInsumo';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {
  

  public ocultoEdit : string = '';
  public ocultoAdd : string = '';
  public insumoActual : Insumo;
  constructor(private http : HttpClient) { }

  getInsumos(): Observable<Insumo[]> {
    return this.http.get('http://localhost:3000/insumo?token='+localStorage.getItem('token')).pipe(map((res: any) => res.data));
  }

  ocultarModalAdd() {
    console.log('ocultar modal');
    this.ocultoAdd= '';
  }

  mostrarModalAdd(){
    this.ocultoAdd = 'block';
    console.log('mostrar modal');
  }

  ocultarModalEdit() {
    console.log('ocultar modal');
    this.ocultoEdit= '';
  }

  mostrarModalEdit(insumo : Insumo){
    this.insumoActual = insumo;
    console.log(this.insumoActual);
    this.ocultoEdit = 'block';
    console.log('mostrar modal');
  }
  
  addInsumo(insumo: Insumo) {
    return this.http.post('http://localhost:3000/insumo?token='+localStorage.getItem('token'), insumo);
  }

  updateInsumo(insumo : Insumo){
    return this.http.put('http://localhost:3000/insumo?token='+localStorage.getItem('token'), insumo);
  }

  uploadImage(nombre : string, uploadData : FormData) {
    return this.http.post(`http://localhost:3000/upload/insumo/${nombre}?token=${localStorage.getItem('token')}`, uploadData);
  }

  deleteInsumo(insumo: Insumo){
    console.log(insumo);
    const options = {
      body: {
        insumoId: insumo.insumoId
      },
    };
    return this.http.delete('http://localhost:3000/insumo?token='+localStorage.getItem('token'), options);

  }
}

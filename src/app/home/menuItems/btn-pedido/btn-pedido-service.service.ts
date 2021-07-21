import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BtnPedidoServiceService {

  public dataRes : any;

  constructor(private http: HttpClient) { }

  getAllData(codigo: string) : Observable<any> {    
    console.log("me pulsaron desde el servicio del boton");
    console.log("El codigo de producto es : " + codigo);
    return this.http.get(`http://localhost:3000/cliente/${codigo}`).pipe(map((res: any) => res.data[0]));    
  }
}

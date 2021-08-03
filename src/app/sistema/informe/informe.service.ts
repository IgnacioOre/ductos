import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InformeService {

  constructor(private http : HttpClient) { }

  getDatosPedido( data : any) {
    return this.http.post('http://localhost:3000/informe/pedidos?token='+localStorage.getItem('token'), data).pipe(map((res: any) => res.data));
  }
}

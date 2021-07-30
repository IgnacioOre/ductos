import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from 'src/app/models/IPedido';

@Injectable({
  providedIn: 'root'
})
export class CalendarioServiceService {

  constructor(private http : HttpClient) { }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get('http://localhost:3000/pedido?token='+localStorage.getItem('token')).pipe(map((res: any) => res.data));
  }
}
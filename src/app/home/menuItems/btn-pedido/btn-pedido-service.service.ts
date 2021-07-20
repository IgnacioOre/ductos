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

  getAllData() : Observable<any> {    
    return this.http.get('http://localhost:3000/cliente').pipe(map((res: any) => res.data[0]));
    
    /*{
      console.log("Estoy en getAllData de btnPedidoServiceService");
      
      console.log(res.data[0]);
      this.dataRes = res.data[0];

      
    }    
    ));*/
  }
}

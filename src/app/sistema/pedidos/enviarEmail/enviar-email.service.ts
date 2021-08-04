import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviarEmailService {

  constructor(private http: HttpClient) {
  }

  enviarEmail(codigo: any, correo: any) {
    var body = {
      email: correo,
      codigo: codigo
      
    };
    return this.http.post('http://localhost:3000/sendemail?token='+localStorage.getItem('token'), body);
  }


}



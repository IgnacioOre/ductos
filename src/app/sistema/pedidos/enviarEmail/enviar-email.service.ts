import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviarEmailService {

  constructor(private http: HttpClient) {
  }

  sendCorreo() {
    this.http.post("/sendemail?token="+localStorage.getItem('token'), "ysalejandra@gmail.com").subscribe(data => {
      console.log(data);
    });

  }


}



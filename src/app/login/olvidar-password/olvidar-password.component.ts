import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/IUsuario';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-olvidar-password',
  templateUrl: './olvidar-password.component.html',
  styleUrls: ['./olvidar-password.component.css']
})
export class OlvidarPasswordComponent implements OnInit {

  formUsuario: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
    this.formUsuario = this.formBuilder.group({
      email: ['', [Validators.required]],
      contraseña: ['', [Validators.required]] 
    });
  }

  ngOnInit(): void {
  }

  datos(){
    var usuario: Usuario = this.formUsuario.value;
    console.log("datos user", usuario);
    this.loginService.recuperarPassword(usuario).subscribe(res => {
      console.log(res);
      this.formUsuario = this.formBuilder.group({
        email: ['', [Validators.required]],
        contraseña: ['', [Validators.required]]
      });
    })
  }
}
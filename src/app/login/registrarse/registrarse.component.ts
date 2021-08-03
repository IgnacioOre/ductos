import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/IUsuario';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  formUsuario: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {

    this.formUsuario = this.formBuilder.group({
      nombreUsuario: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contraseña: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {

  }

  registrarse() {
    var usuario: Usuario = this.formUsuario.value;
    console.log(usuario);
    this.loginService.registrarse(usuario).subscribe(res => {
      console.log(res);
      this.formUsuario = this.formBuilder.group({
        nombreUsuario: ['', [Validators.required]],
        email: ['', [Validators.required]],
        contraseña: ['', [Validators.required]]
      });
    })
  }
}
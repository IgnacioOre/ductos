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

  //::::::::::::::::::::::::::::::::::::::::::::::
  showInfo = {
    infoInicio: false,
    infoAbout: false,
    infoProducto: false,
    infoPedidos: false,
    infoContactanos: false
  }

  changeInfoPage = {
    pageOne: false,
    pageTwo: false,
    pageThree: false,
    pagination: false
  }

  changeStateContent(btn: string) {
    switch (btn) {
      case 'inicio':
        this.showInfo.infoInicio = !this.showInfo.infoInicio,
          this.showInfo.infoAbout = false;
        this.showInfo.infoProducto = false;
        this.showInfo.infoPedidos = false;
        this.showInfo.infoContactanos = false;
        break;

      case 'about':
        this.showInfo.infoAbout = !this.showInfo.infoAbout,
          this.showInfo.infoInicio = false;
        this.showInfo.infoProducto = false;
        this.showInfo.infoPedidos = false;
        this.showInfo.infoContactanos = false;
        break;

      case 'producto':
        this.showInfo.infoProducto = !this.showInfo.infoProducto,
          this.showInfo.infoInicio = false;
        this.showInfo.infoAbout = false;
        this.showInfo.infoPedidos = false;
        this.showInfo.infoContactanos = false;
        break;

      case 'pedidos':
        this.showInfo.infoPedidos = !this.showInfo.infoPedidos,
          this.showInfo.infoInicio = false;
        this.showInfo.infoAbout = false;
        this.showInfo.infoProducto = false;
        this.showInfo.infoContactanos = false;
        break;

      case 'contactanos':
        this.showInfo.infoContactanos = !this.showInfo.infoContactanos,
          this.showInfo.infoInicio = false;
        this.showInfo.infoAbout = false;
        this.showInfo.infoProducto = false;
        this.showInfo.infoPedidos = false;
        break;
    }
  }

  changePage(btn: string) {
    switch (btn) {
      case 'pageOne':
        this.changeInfoPage.pageOne = !this.changeInfoPage.pageOne;
        this.changeInfoPage.pageTwo = false;
        this.changeInfoPage.pageThree = false;
        break;

      case 'pageTwo':
        this.changeInfoPage.pageTwo = !this.changeInfoPage.pageTwo;
        this.changeInfoPage.pageOne = false;
        this.changeInfoPage.pageThree = false;
        break;

      case 'pageThree':
        this.changeInfoPage.pageThree = !this.changeInfoPage.pageThree;
        this.changeInfoPage.pageOne = false;
        this.changeInfoPage.pageTwo = false;
        break;

      case 'pagination':
        this.changeInfoPage.pagination = !this.changeInfoPage.pagination;
        this.changeInfoPage.pageOne = !this.changeInfoPage.pageOne;
        break;

      case 'off':
        this.changeInfoPage.pagination = false,
          this.changeInfoPage.pageOne = false,
          this.changeInfoPage.pageTwo = false,
          this.changeInfoPage.pageThree = false
        break;
    }
  }

}

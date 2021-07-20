import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  showInfo = {
    infoInicio: false,
    infoAbout: false,
    infoProducto: false,
    infoPedidos: false,
    infoContactanos: false
  }

  changeStateContent(btn: string){

    switch(btn){
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

  

  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { CalendarioComponent } from '../calendario/calendario.component';

@Component({
  selector: 'app-home-sistema',
  templateUrl: './home-sistema.component.html',
  styleUrls: ['./home-sistema.component.css']
})
export class HomeSistemaComponent implements OnInit {

  routes: Routes = [
    {
      path: '/calendario',
      component: CalendarioComponent
    }
  ]

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.loginService.logout();
  }

}

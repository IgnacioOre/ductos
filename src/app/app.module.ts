import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PedidosComponent } from './sistema/pedidos/pedidos.component';
import { AddPedidoComponent } from './add-pedido/add-pedido.component';
import { HomeComponent } from './home/home.component';
import { BtnPedidoComponent } from './home/menuItems/btn-pedido/btn-pedido.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { EditPedidoComponent } from './edit-pedido/edit-pedido.component';
import { CerrarSesionComponent } from './sistema/pedidos/modal-cerrar-sesion/cerrar-sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PedidosComponent,
    AddPedidoComponent,
    HomeComponent,
    BtnPedidoComponent,
    ConfirmacionComponent,
    EditPedidoComponent,
    CerrarSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'seguimiento', component: BtnPedidoComponent},
      {path: 'login', component: LoginComponent},
      {path: 'pedidos', component: PedidosComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

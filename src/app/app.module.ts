import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PedidosComponent } from './sistema/pedidos/pedidos.component';
import { HomeComponent } from './home/home.component';
import { BtnPedidoComponent } from './home/menuItems/btn-pedido/btn-pedido.component';
import { ConfirmacionComponent } from './sistema/pedidos/confirmacion/confirmacion.component';
import { EditPedidoComponent } from './sistema/pedidos/edit-pedido/edit-pedido.component';
import { DetailPedidoComponent } from './sistema/pedidos/detail-pedido/detail-pedido.component';
import { LoginGuard } from './login/login.guard';
import { AddPedidoComponent } from './sistema/pedidos/add-pedido/add-pedido.component';
import { InsumosComponent } from './sistema/insumos/insumos.component';
import { CalendarioComponent } from './sistema/calendario/calendario.component';
import { ClientesComponent } from './sistema/clientes/clientes.component';
import { ProductosComponent } from './sistema/productos/productos.component';
import { AddClienteComponent } from './sistema/clientes/add-cliente/add-cliente.component';
import { EditClienteComponent } from './sistema/clientes/edit-cliente/edit-cliente.component';

import { AddProductoComponent } from './sistema/productos/add-producto/add-producto.component';
import { AddInsumoComponent } from './sistema/insumos/add-insumo/add-insumo.component';
import { EditInsumoComponent } from './sistema/insumos/edit-insumo/edit-insumo.component';
import { InformeComponent } from './sistema/informe/informe.component';
import { HomeSistemaComponent } from './sistema/home-sistema/home-sistema.component';
import { AgregarInsumosComponent } from './sistema/productos/add-producto/agregar-insumos/agregar-insumos.component';
import { EditProductoComponent } from './sistema/productos/edit-producto/edit-producto.component';
import { DetailProductoComponent } from './sistema/productos/detail-producto/detail-producto.component';
import { RegistrarseComponent } from './login/registrarse/registrarse.component';



import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule, DatePipe } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDateRangeModule } from 'ngx-daterange';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OlvidarPasswordComponent } from './login/olvidar-password/olvidar-password.component';
import { InformeGuard } from './sistema/informe/informe.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PedidosComponent,
    HomeComponent,
    BtnPedidoComponent,
    ConfirmacionComponent,
    EditPedidoComponent,
    DetailPedidoComponent,
    AddPedidoComponent,
    InsumosComponent,
    ClientesComponent,
    CalendarioComponent,
    ProductosComponent,
    AddClienteComponent,
    EditClienteComponent, 
    HomeSistemaComponent,
    AddInsumoComponent,
    EditInsumoComponent,
    InformeComponent,
    ProductosComponent,
    AddProductoComponent,
    AgregarInsumosComponent,
    EditProductoComponent,
    DetailProductoComponent,
    RegistrarseComponent,
    OlvidarPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'seguimiento', component: BtnPedidoComponent},
      {path: 'login', component: LoginComponent},
      {path: 'productos', component: ProductosComponent, canActivate: [LoginGuard]},
      {path: 'pedidos', component: PedidosComponent, canActivate: [LoginGuard] },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'cliente', component: ClientesComponent, canActivate: [LoginGuard]},
      {path: 'home-sistema', component: HomeSistemaComponent, canActivate: [LoginGuard]},
      {path: 'calendario', component: CalendarioComponent, canActivate: [LoginGuard] },
      {path: 'insumos', component: InsumosComponent, canActivate: [LoginGuard]},
      {path: 'informe', component: InformeComponent, canActivate: [InformeGuard]},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'registrarse', component: RegistrarseComponent},
      {path: 'recuperarPassword', component: OlvidarPasswordComponent}
    ]),
    CalendarModule.forRoot({
      provide: DateAdapter, useFactory: adapterFactory
    }),
    CommonModule,
    NgbModalModule,
    NgbModule,
    FlatpickrModule.forRoot(),
    NgxDateRangeModule,
    BrowserAnimationsModule
  ],
  providers: [LoginGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
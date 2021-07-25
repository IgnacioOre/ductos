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
import { InformesComponent } from './sistema/informes/informes.component';
import { ProductosComponent } from './sistema/productos/productos.component';
import { AddProductoComponent } from './sistema/productos/add-producto/add-producto.component';
import { AddInsumoComponent } from './sistema/insumos/add-insumo/add-insumo.component';
import { EditInsumoComponent } from './sistema/insumos/edit-insumo/edit-insumo.component';
import { HomeSistemaComponent } from './sistema/home-sistema/home-sistema.component';



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
    InformesComponent,
    ProductosComponent,
    HomeSistemaComponent,
    AddInsumoComponent,
    EditInsumoComponent
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
      {path: 'productos', component: ProductosComponent},
      {path: 'pedidos', component: PedidosComponent, canActivate: [LoginGuard] },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home-sistema', component: HomeSistemaComponent},
      {path: 'calendario', component: CalendarioComponent, canActivate: [LoginGuard] },
      {path: 'insumos', component: InsumosComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ])
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

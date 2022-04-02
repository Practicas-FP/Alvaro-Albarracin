import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { MainComponent } from './main/main.component';
import { DetalleComponent } from './detalle/detalle.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule} from 'ngx-pagination';
import { ErrorComponent } from './resultados/404.component';
import { LoginComponent } from './sesion/login.component';
import { SiginComponent } from './sesion/sigin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HistorialComponent } from '../shared/historial/historial.component';
import { ProfileComponent } from './sesion/profile.component';


@NgModule({
  declarations: [
    MainComponent,
    BusquedaComponent,
    ResultadosComponent,
    ErrorComponent,
    DetalleComponent,
    LoginComponent,
    SiginComponent,
    ProfileComponent
    
  ],
  exports: [
    MainComponent,
    ResultadosComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [HistorialComponent],

})
export class PelisModule { }

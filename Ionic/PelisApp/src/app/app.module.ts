import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomePageModule } from './home/home.module';
import { SiginPageModule } from './sesion/sigin.module';
import { LoginPageModule } from './sesion/login.module';
import { DetallePageModule } from './detalle/detalle.module';
import { ProfilePageModule } from './sesion/profile.module';
import { Camera } from '@ionic-native/camera/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, HomePageModule, DetallePageModule, SiginPageModule, LoginPageModule, ProfilePageModule],
  providers: [Camera, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialComponent } from './historial/historial.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HistorialComponent
  ],
  exports: [
    HistorialComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }

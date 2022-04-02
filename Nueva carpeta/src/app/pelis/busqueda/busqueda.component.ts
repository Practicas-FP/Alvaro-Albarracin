import { Component, ElementRef, ViewChild } from '@angular/core';
import { PelisService } from '../services/pelis.service';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild("txtBuscar") txtBuscar!: ElementRef<HTMLInputElement>;
  @ViewChild("check") check!: ElementRef<HTMLInputElement>;

  constructor( private pelisService: PelisService ) { this.estate = this.pelisService.estate }

  public estadoCheck!: boolean;
  public estate!: string;

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    this.estadoCheck = this.check.nativeElement.checked;
    this.estate = this.check.nativeElement.checked.toString();

    if ( valor.trim().length === 0 ) {
      return;
    }

    this.pelisService.buscarPelis( valor, this.estate );

    this.txtBuscar.nativeElement.value = "";
    this.txtBuscar.nativeElement.blur();


  }

  cambiarEstado() {
    this.estadoCheck = this.check.nativeElement.checked;
    this.estate = this.check.nativeElement.checked.toString();
    this.pelisService.cambiarEstadoCheck( this.estadoCheck );
    this.pelisService.buscarPelis( this.pelisService.consulta, this.estate );

  }

  ngOnInit(): void {

  }

  get total() {
    return this.pelisService.total;
  }


}

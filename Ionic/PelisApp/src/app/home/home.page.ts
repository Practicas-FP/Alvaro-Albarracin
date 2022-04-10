import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PelisService } from '../services/pelis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


export class HomePage implements OnInit {

  searchValue:string;

  public contenido: string = "contenidos";
  public carga: boolean=true;
  public imagenUrl: string = "https://image.tmdb.org/t/p/w500";
  
  constructor(private pelisService: PelisService) {
    setTimeout(() => {
      this.carga=false
    }, 200);
  }

  buscar(event) {
    const valor = event.target.value;
    this.contenido = valor;
    event.target.blur();

    if ( valor.trim().length === 0 ) {
      return;
    }

    setTimeout(() => {
      this.carga=false
    }, 600);

    this.pelisService.buscarPelis( valor );

    this.searchValue = "";

    this.carga=true
  }

  origen(origen: string){
    this.pelisService.origen=origen;
  }

  get resultados() {
    return this.pelisService.resultados;
  }

  get total() {
    return this.pelisService.total;
  }

  ngOnInit() {
  }

}

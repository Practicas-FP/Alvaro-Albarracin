import { Component } from '@angular/core';
import { PelisService } from '../services/pelis.service';
import { Peli } from '../interface/pelis.interface';



@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]

})
export class ResultadosComponent {

  public nula!: boolean;
  public p: number = 1;
  public totalLength!: number; 
  public labels: any = {
    previousLabel: '-',
    nextLabel: '-',
  }; 
  public peli!: Peli;

  public loginOK: boolean =true;
  public isFav: boolean = false;
  public usuario!: string;
  public peliId!: string;
  public load: boolean = true;


  public imagenUrl: string = "https://image.tmdb.org/t/p/w500";

  get resultados() {
    return this.pelisService.resultados;
  }

  get total() {
    return this.pelisService.total;
  }

  get query() {
    return this.pelisService.consulta.toUpperCase();
  }

  constructor( public pelisService: PelisService ) {
    this.totalLength = this.pelisService.total;
    setTimeout(() => {
      this.load = false
    }, 300);
    
  }

 
}

 



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchPelisResponse, Peli } from '../interface/pelis.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PelisService {

  public apiKey: string = "e147423cbda7a129be9c69a1aa1c9b3d";
  public servicioUrl: string = "https://api.themoviedb.org/3/search/movie?";
  public servicioUrlId: string = "https://api.themoviedb.org/3/movie/";

  private _historial: string[] = [];

  public  resultados: Peli[] = [];
  public  resultado!: Peli ;
  public  image!: string;
  public  total!: number;
  public  estadoCheck!: boolean;
  public  estate!: string;
  public  consulta: string = "";
  public  origen: string = "";


  get historial() {
    return  [...this._historial];
  }

  get estado() {
    return  this.estate;
  }

  constructor(private http: HttpClient) {

      if( localStorage.getItem( "historial" )){
        this._historial = JSON.parse( localStorage.getItem( "historial" )! );
        this.resultados = JSON.parse( localStorage.getItem( "resultados" )! );
        this.resultado = JSON.parse( localStorage.getItem( "resultado" )! );
      }

        this.estate =  localStorage.getItem( "estado" )!;
      
  }

  eliminarHistorial(query: string){

    let posicion = 0;

    for (let i = 0; i < this._historial.length ; i++) {
      if(this._historial[i] == query ) {
        posicion = i;
      }
    }
    
    this._historial.splice (posicion, 1 );

    localStorage.setItem("historial", JSON.stringify(this._historial));
    if(this.consulta == query){
    this.total = -1;
    this.consulta="";
    }
  }

  cambiarEstadoCheck(estado: boolean){

    this.estadoCheck = estado;
    this.estate = estado.toString();
    localStorage.setItem("estado", estado.toString());

  }

  buscarPelis(query: string = "", estado: string) {


    query = query.trim().toLocaleLowerCase();

    this.consulta = query;

    this.resultados = [];

    this.http.get<SearchPelisResponse>(`${ this.servicioUrl }api_key=${ this.apiKey }&query=${ query }&language=es-ES&append_to_response=images&include_image_language=ES` )
        .subscribe(( resp ) => {
          this.resultados = resp.results;

          if(estado == "true"){

            var elim: number[] = [];
            for(var i = 0; i < this.resultados.length;i++){
                if(this.resultados[i].poster_path == null) {
                  elim.unshift(i);
                  this.resultados[i].nula = true;
                } else {
                  this.resultados[i].nula = false;
                }
            }
            
            for(var j = 0; j < elim.length;j++){
              this.resultados.splice(elim[j],1)
            }

          } else {

            for(var i = 0; i < this.resultados.length;i++){
              if(this.resultados[i].poster_path == null) {
                  this.resultados[i].nula = true;
                } else {
                  this.resultados[i].nula = false;
                }
            
            }

         }
                  
          localStorage.setItem("resultados", JSON.stringify(this.resultados));

          this.total = resp.total_results;

            if( !this._historial.includes( query )) {
        
              if(this.total > 0) {
        
              this._historial.unshift( query );
              this._historial = this._historial.splice(0,5)
        
              localStorage.setItem("historial", JSON.stringify(this._historial));
        
              }
        
            }

            

          });


  }   
    origin(o: string){

      this.origen = o;

    }


  // peliID( id: string ):Observable<Peli>{
  //   const url = `${ this.servicioUrlId }${ id }?api_key=${ this.apiKey }&language=es-ES&append_to_response=images&include_image_language=ES`;
  //   return this.http.get<Peli>( url );
  // }

}
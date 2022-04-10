import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchPelisResponse, Peli } from '../interface/pelis.interface';

@Injectable({
  providedIn: 'root'
})
export class PelisService {

  public apiKey: string = "e147423cbda7a129be9c69a1aa1c9b3d";
  public servicioUrl: string = "https://api.themoviedb.org/3/search/movie?";
  public servicioUrlId: string = "https://api.themoviedb.org/3/movie/";

  public resultados: Peli[] = [];
  public resultado!: Peli;
  public image!: string;
  public total!: number;
  public totalFav!: number;
  public consulta: string = "";
  public origen: string = "";
  public datos: any[] = [];

  constructor(public http: HttpClient) { }


  buscarPelis(query: string = "") {

    query = query.trim().toLocaleLowerCase();

    this.consulta = query;

    this.resultados = [];

    this.http.get<SearchPelisResponse>(`${this.servicioUrl}api_key=${this.apiKey}&query=${query}&language=es-ES&append_to_response=images&include_image_language=ES`)
      .subscribe((resp) => {
        this.resultados = resp.results;

        var elim: number[] = [];
        for (var i = 0; i < this.resultados.length; i++) {
          if (this.resultados[i].poster_path == null) {
            elim.unshift(i);
            this.resultados[i].nula = true;
          } else {
            this.resultados[i].nula = false;
          }
        }

        for (var j = 0; j < elim.length; j++) {
          this.resultados.splice(elim[j], 1)
        }

        this.total = resp.total_results;

      });

  }

}
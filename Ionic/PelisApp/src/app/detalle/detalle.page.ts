import { OnInit } from '@angular/core';
import { PelisService } from '../services/pelis.service';
import { Router } from '@angular/router';
import { Peli } from '../interface/pelis.interface';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { collection, query, where, getDocs,getFirestore, getDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyBpHgWq8ejMsDi1mgMTg3KgxdTWoacs1FA",
  authDomain: "pelisapp-24714.firebaseapp.com",
  projectId: "pelisapp-24714",
  storageBucket: "pelisapp-24714.appspot.com",
  messagingSenderId: "505441685394",
  appId: "1:505441685394:web:f8d9417216ac07ace93b4b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


@Component({
  selector: 'app-home',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})

export class DetallePage implements OnInit {

  public peli!: Peli;

  public imagenUrl: string = "https://image.tmdb.org/t/p/w500";
  public loginOK: boolean =true;
  public isFav: boolean = false;
  public usuario!: string;

  public apiKey: string = "e147423cbda7a129be9c69a1aa1c9b3d";
  public servicioUrlId: string = "https://api.themoviedb.org/3/movie/";

  public  idPeli: string = this.router.url.replace("/detalle/","")
  public  tituloPeli!: string ;
  public  resumenPeli!: string ;
  public  notaPeli!: number ;
  public  anioPeli!: Date ;
  public  anioPeliS!: string ;
  public  imagenPeli!: string ;
  public  fondoPeli!: string ;
  public carga: boolean = true;
  pp: any

  public origen: string = "";

  constructor( 
    private pelisService: PelisService,
    private http: HttpClient,
    private router: Router
    ) {

      setTimeout(() => {
        this.carga=false;
      }, 800);

        this.origen = this.pelisService.origen;

      const url = `${ this.servicioUrlId }${ this.router.url.replace("/detalle/","")
    }?api_key=${ this.apiKey }&language=es-ES&append_to_response=images&include_image_language=ES`;

      this.http.get<Peli>( url )
        .subscribe(( resp ) => {
          this.tituloPeli = resp.title;
          this.resumenPeli = resp.overview;
          this.anioPeli = resp.release_date;
          this.anioPeliS = this.anioPeli.toString().substring(0, 4);
          this.imagenPeli = resp.poster_path;
          this.notaPeli = resp.vote_average;
          this.fondoPeli = resp.backdrop_path;
        }, err => {
          this.router.navigate(["error"])
          })

      this.carga=true;

      const auth = getAuth();
    
        onAuthStateChanged(auth, async (user) => {
  
          if (user) {
            const uid = user.uid;
  
            this.usuario = uid;
  
            this.loginOK = true;
  
            const docRef = doc(db, "pelis", this.idPeli+this.usuario);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
              this.isFav = true;
            } else {
              this.isFav = false;
            }       
                  
          } else {
    
            this.loginOK = false;
    
          }
  
     })

    }
  ngOnInit(): void {
  }

  fav(){

    if(this.isFav){
      this.isFav=false;
      deleteDoc(doc(db,"pelis",this.idPeli + this.usuario ));
    } else {
      this.isFav=true;
      setDoc(doc(db, "pelis",this.idPeli + this.usuario ), {
        usuario: this.usuario,
        titulo: this.tituloPeli,
        peli: this.idPeli,
        imagen: this.imagenPeli,
        nota: this.notaPeli,
        resumen: this.resumenPeli,
        anio: this.anioPeli
     })
    }

  }

  get resultado() {
    return this.pelisService.resultado;
  }

  get total() {
    return this.pelisService.image;
  }

  volver(){
    if(this.pelisService.origen=="h"){
      this.router.navigate(['']);
    } else {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        this.pelisService.datos = []

          const usuario = user.uid;
  
          const q = query(collection(db, "pelis"), where("usuario", "==", usuario));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
  
            this.peli = {
  
            title: doc.get("titulo"),
            release_date: doc.get("anio"),
            nula:             false,
            adult:             false,
            backdrop_path:     "",
            id:                doc.get("peli"),
            original_language: "",
            original_title:    "",
            overview:          "",
            popularity:        0,
            poster_path:       doc.get("imagen"),
            video:             false,
            vote_average:      0,
            vote_count:        0,
            genre_ids: [0]
          
          }
  
              this.pelisService.datos.push(this.peli)
            
            });
  
            this.pelisService.totalFav = this.pelisService.datos.length

     }) 

     this.router.navigate(['profile']);

    }
  }


}
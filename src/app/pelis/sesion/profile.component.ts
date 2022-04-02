import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {Router} from '@angular/router';
import { collection, query, where, getDocs, getFirestore, deleteDoc, doc } from 'firebase/firestore';
import { Peli } from '../interface/pelis.interface';
import { PelisService } from '../services/pelis.service';



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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public nula!: boolean;
  public p: number = 1;
  public totalLength!: number; 
  public labels: any = {
    previousLabel: 'Anterior',
    nextLabel: 'Siguiente',
  }; 

  public usuario: string = "";
  public uid: string = "";

  public imagenUrl: string = "https://image.tmdb.org/t/p/w500";

  public  idPeli!: string;
  public  tituloPeli!: string ;
  public  resumenPeli!: string ;
  public  notaPeli!: number ;
  public  anioPeli!: Date ;
  public  imagenPeli!: string ;

  public  peli!: Peli;
  public  datos: any[] = [];
  public  total!: number;
  public  load: boolean = true;

  public apiKey: string = "e147423cbda7a129be9c69a1aa1c9b3d";
  public servicioUrlId: string = "https://api.themoviedb.org/3/movie/";

  constructor( public pelisService: PelisService, private router:Router ) { 
    const auth = getAuth();

    setTimeout(() => {
      this.load = false
    }, 800);
    
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const usuario = user.email;

        this.usuario = usuario!;
        this.uid = uid!;
        const q = query(collection(db, "pelis"), where("usuario", "==", this.uid));
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

            this.datos.push(this.peli)
          
          });

          this.total = this.datos.length

      } else {

        this.router.navigate([""]);

      }

   })
  }

  async noFav(id: string){

      this.datos = [];

    deleteDoc(doc(db,"pelis", id + this.uid ));

    const q = query(collection(db, "pelis"), where("usuario", "==", this.uid));
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

      this.datos.push(this.peli)
    
    });

    this.total = this.datos.length

  }


  ngOnInit(): void {
  }

}

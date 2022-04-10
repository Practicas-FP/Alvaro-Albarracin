import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { Peli } from '../interface/pelis.interface';
import { PelisService } from '../services/pelis.service';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { PhotoService } from '../services/photo.service';
import { ActionSheetController } from '@ionic/angular';


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
  templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {

  public usuario: string = ""
  public email: string = ""
  public photo: string = ""
  
  public peli!: Peli;
  public total!: number;
  public carga: boolean = true;
  public imagenUrl: string = "https://image.tmdb.org/t/p/w500";


  constructor(public actionSheetController: ActionSheetController,public photoService: PhotoService,private router: Router, public pelisService: PelisService) {

    const auth = getAuth();

    setTimeout(() => {
      this.carga = false
    }, 800);
    
    onAuthStateChanged(auth, async (user) => {
      this.pelisService.datos = []

      if (user) {
        const usuario = user.uid;
        const email = user.email;

        this.email = email;
        this.usuario = usuario;
        const q1 = query(collection(db, "users"), where("usuario", "==", this.usuario));
        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
          this.photo = doc.get("foto");
        });
        const q2 = query(collection(db, "pelis"), where("usuario", "==", this.usuario));
          const querySnapshot2 = await getDocs(q2);
          querySnapshot2.forEach((doc) => {

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

      } else {

        this.router.navigate([""]);

      }

   })
  }

  origen(origen: string){
    this.pelisService.origen=origen;
  }

  foto() {
    this.presentActionSheet();

  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      cssClass: 'my-custom-class',
      buttons: [ {
        text: 'Hacer foto',
        icon: 'camera',
        data: 10,
        handler: () => {
          this.photoService.hacerFoto();
        }
      }, {
        text: 'Seleccionar foto',
        icon: 'folder',
        data: 10,
        handler: () => {
          this.photoService.seleccionarFoto();
        }
      }, {
        text: 'Eliminar foto',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',
        data: {
          type: 'delete'
        },
        handler: () => {
          this.photoService.eliminarFofo();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
      }]
    });
    await actionSheet.present();

  }

  ngOnInit() {
  }


}


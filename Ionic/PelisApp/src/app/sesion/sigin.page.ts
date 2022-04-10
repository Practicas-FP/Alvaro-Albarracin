import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { ToastController } from '@ionic/angular';

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
  selector: 'app-sigin',
  templateUrl: './sigin.page.html',
})
export class SiginPage implements OnInit {

  public ok: boolean = false;
  public error: boolean = false;
  public login: boolean = false;
  public mensaje: string = ""
  public usuario: string = ""
  public foto: string = ""
  public password: string = ""
  public passwordR: string = ""
  public us:string;
  public ps:string;
  public psr:string;


  constructor(private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  user(event){
    const valor = event.target.value;
    this.usuario = valor;
  }

  pass(event){
    const valor = event.target.value;
    this.password = valor;
  }

  passR(event){
    const valor = event.target.value;
    this.passwordR = valor;
  }

  onRegister(){

    this.error = false;
    this.ok = false;

    const email =  this.usuario;
    const pass =  this.password;
    const passR =  this.passwordR;


    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if( !email.match(regex) ){

      this.error = true;
      this.mensaje = "El correo electrónico no es válido."

    } 

    if( pass.length < 6 ){

      this.error = true;
      this.mensaje = "La contraseña debe tener al menos 6 caracteres."

    } 

    if( pass != passR ){

      this.error = true;
      this.mensaje = "Las contraseñas no coinciden."

    } 

    if (this.error == false) {

      this.ok = true;

      const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          const user = userCredential;

          updateProfile(auth.currentUser, {
            photoURL: "./assets/user.png"
          })

          signInWithEmailAndPassword(auth, email, pass)
          .then((userCredential) => {
              const user = userCredential;    
              onAuthStateChanged(auth, (user) => {
                
                if (user) {
                  const uid = user.uid; 

                  setDoc(doc(db, "users", uid ), {
                    foto: "./assets/user.png",
                    usuario: uid,
                 })
              
                } 
    
              })
              
          })
    
          this.router.navigate([""]);

          this.presentToast();

      }).catch((error) => {

        this.error = true;
        
        if(error.code == "auth/email-already-in-use") {
          this.mensaje = "Este usuario ya existe.";
        } 

      });

     }

    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cuenta creada correctamente. Estas logueado.',
      duration: 2000
    });
    toast.present();
  }

}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



const firebaseConfig = {
  apiKey: "AIzaSyBpHgWq8ejMsDi1mgMTg3KgxdTWoacs1FA",
  authDomain: "pelisapp-24714.firebaseapp.com",
  projectId: "pelisapp-24714",
  storageBucket: "pelisapp-24714.appspot.com",
  messagingSenderId: "505441685394",
  appId: "1:505441685394:web:f8d9417216ac07ace93b4b"
};

const app = initializeApp(firebaseConfig);

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styles: [
  ]
})
export class SiginComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    passwordConfirm: new FormControl("")
  });

  public error: boolean = false;
  public ok: boolean = false;
  public mensaje: string = "";

  constructor( private router:Router){}


  ngOnInit(): void {

  }

  
  onRegister(){

    this.error = false;
    this.ok = false;

    const email =  this.registerForm.controls["email"].value;
    const pass =  this.registerForm.controls["password"].value;
    const passC =  this.registerForm.controls["passwordConfirm"].value;

    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if( !email.match(regex) ){

      this.error = true;
      this.mensaje = "El correo electrónico no es válido."

    } 

    if( pass.length < 6 ){

      this.error = true;
      this.mensaje = "La contraseña debe tener al menos 6 caracteres."

    } 

    if( pass != passC ){

      this.error = true;
      this.mensaje = "Las contraseñas no coinciden."

    } 

    if (this.error == false) {

      this.ok = true;

      const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          const user = userCredential;

          signInWithEmailAndPassword(auth, email, pass)
          .then((userCredential) => {
              const user = userCredential;
    
              onAuthStateChanged(auth, (user) => {
                
                if (user) {
                  const uid = user.uid;            
                } 
    
              })
              
          })
    
          // this.showSuccess()

          this.router.navigate([""]);

      }).catch((error) => {

        this.error = true;
        
        if(error.code == "auth/email-already-in-use") {
          this.mensaje = "Este usuario ya existe.";
        } 

      });

     }

    
  }

//   showSuccess() {
//     this.toastr.success('Usuario ' + this.registerForm.controls["email"].value + ' creado y logueado correctamente.', 'Aviso')
// };

}

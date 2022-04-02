import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { HistorialComponent } from '../../shared/historial/historial.component';
// import { ToastrService } from 'ngx-toastr';


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
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  public error: boolean = false;
  public login: boolean = false;
  public mensaje: string = "";

  constructor( private router:Router, public his:HistorialComponent){}

  ngOnInit(): void {
  }

  
  onLogin(){

    this.error = false;

    const email =  this.loginForm.controls["email"].value;
    const pass =  this.loginForm.controls["password"].value;

    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if( !email.match(regex) ){

      this.error = true;
      this.mensaje = "El usuario debe ser un correo electrónico."

    } 

    if( email.length == 0 || pass.length == 0 ){

      this.error = true;
      this.mensaje = "Intruduce usuario y contraseña."

    } 

    if (this.error == false) {

      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
          const user = userCredential;

          onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
            }
              
          })

          this.router.navigate([""]);
          // this.showSuccess()
          
      })
      .catch((error) => {
        this.error = true;
        
        if(error.code == "auth/wrong-password") {
          this.mensaje = "La contraseña para este usuario es incorrecta.";
        } 

        if(error.code == "auth/user-not-found") {
          this.mensaje = "El usuario no existe.";
        } 

      });

    }
      
  }

//   showSuccess() {
//     this.toastr.success('Usuario ' + this.loginForm.controls["email"].value + ' logueado correctamente.', 'Aviso')
// };

  }



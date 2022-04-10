import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

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
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

    public usuario: string;
    public loginOK: boolean;
    public appPages = [
      { title: 'Buscador', url: '/home', icon: 'search' },
      { title: 'Sig-in', url: '/sigin', icon: 'add-circle' },
      { title: 'Log-in', url: '/login', icon: 'log-in' },
    ];
  
  constructor() {

    window.screen.orientation.lock('portrait');

    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {

      if (user) {
        const email = user.email;
        this.usuario = email;
        this.loginOK = true; 

        this.appPages = [
          { title: 'Buscador', url: '/home', icon: 'search' },
          { title: email, url: '/profile', icon: 'person' },
          { title: 'Log-out', url: '/logout', icon: 'log-out' },
        ];
              
      } else {

        this.loginOK = false;

        this.appPages = [
          { title: 'Buscador', url: '/home', icon: 'search' },
          { title: 'Sig-in', url: '/sigin', icon: 'add-circle' },
          { title: 'Log-in', url: '/login', icon: 'log-in' },
        ];

      }

   })
  }

}
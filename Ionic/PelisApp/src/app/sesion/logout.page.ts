import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
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

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
})
export class LogoutPage implements OnInit {

  public loginOK: boolean = false;

  constructor(public toastController: ToastController,private router: Router) {this.onLogout()}

  ngOnInit(): void {
  }
  onLogout() {

    const auth = getAuth();
    signOut(auth).then(() => {
      this.loginOK = false;
    });

    this.router.navigate([""]);

    this.presentToast()

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Has salido de tu cuenta.',
      duration: 2000
    });
    toast.present();
  }

}


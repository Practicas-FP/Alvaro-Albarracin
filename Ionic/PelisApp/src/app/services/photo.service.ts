import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { setDoc, doc, getFirestore } from 'firebase/firestore';
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

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public foto: string;
  public user: string;

  constructor(public toastController: ToastController) {
    
    const auth = getAuth();

    onAuthStateChanged(auth, async (user) => {
  
      if (user) {
        this.user = user.uid;
      }

    })
  }

  public eliminarFofo(){

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
                
      if (user) {
        const uid = user.uid; 

        setDoc(doc(db, "users", uid ), {
          foto: "./assets/user.png",
          usuario: uid,
       })

       setTimeout(() => {
        window.location.reload();
      
      }, 500);
    
      }
    })

  }

  public async hacerFoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.readAsBase64(capturedPhoto).then(result => {
      this.foto = result;

      setDoc(doc(db, "users",this.user ), {
        foto: this.foto,
        usuario: this.user,
     })



    }
    )

    setTimeout(() => {
        window.location.reload();
      
      }, 1500);

  }

  public async seleccionarFoto(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
    });

    this.readAsBase64(capturedPhoto).then(result => {
      this.foto = result;

      setDoc(doc(db, "users",this.user ), {
        foto: this.foto,
        usuario: this.user,
     })



    }
    )

    setTimeout(() => {
        window.location.reload();
      
      }, 1000);
  }

  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}



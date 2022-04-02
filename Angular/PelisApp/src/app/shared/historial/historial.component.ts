import { ElementRef, ViewChild, Component } from '@angular/core';
import { PelisService } from '../../pelis/services/pelis.service';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styles: [
  ]
})

export class HistorialComponent  {

  @ViewChild("respon") respon!: ElementRef<HTMLInputElement>;
  @ViewChild("histo") histo!: ElementRef<HTMLInputElement>;

  private abierto: boolean = false;
  public loginOK!: boolean;
  public usuario: string = "";

  get historial () {
    return this.pelisService.historial;
  }

  constructor( private pelisService: PelisService ) {

    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const usuario = user.email;

        this.usuario = usuario!;
        this.loginOK = true;
        
      } else {

        this.loginOK = false;

      }

   })


  }

  buscar(termino: string) {
      
    this.pelisService.buscarPelis( termino, this.pelisService.estate );

  }

  eliminar(termino: string) {

    this.pelisService.eliminarHistorial( termino );

 }  
 
 onLogout() {

  const auth = getAuth();
  signOut(auth).then(() => {
    this.loginOK = false;
  });
}

   responsive() {
     if(this.abierto){
      this.respon.nativeElement.style.transform = "rotate(45deg)";
      this.respon.nativeElement.style.transition  = "transform 0.5s";
      this.histo.nativeElement.style.opacity = "0";
      this.histo.nativeElement.style.transition  = "opacity 0.5s , max-height 0.5s";
      this.histo.nativeElement.style.display = "block";
      this.histo.nativeElement.style.maxHeight = "0px";
      this.respon.nativeElement.style.marginTop = "-10px"
      this.respon.nativeElement.style.marginBottom = "0px"
      this.abierto = false;  
     } else {
      this.respon.nativeElement.style.transform = "rotate(225deg)";
      this.respon.nativeElement.style.transition  = "transform 0.5s ";
      this.histo.nativeElement.style.transition  = "opacity 0.5s , max-height 0.5s";
      this.histo.nativeElement.style.opacity = "1";
      this.histo.nativeElement.style.maxHeight = "1000px"
      this.respon.nativeElement.style.marginBottom = "-12px"
      this.respon.nativeElement.style.marginTop = "20px"
      this.abierto = true;    
     }
  }

//   showSuccess() {
//     this.toastr.success('Usuario ' + this.usuario + ' ha cerrado la sesión.', 'Aviso')
// };

}

import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: Auth, public router: Router, public firestore: Firestore){}

  
  public loggedUser: string = "";
  public errorRegistro: boolean = false;
  public mensajeErrorRegister: string = "";

  Register(userMail: string, userPassword: string)
  {
    createUserWithEmailAndPassword(this.auth, userMail, userPassword).then((res)=> {
      if(res.user.email != null) 
        {
          this.loggedUser = res.user.email;
          this.router.navigateByUrl('home');
        }  
      }).catch((e) => {
      console.log(e.code);
      this.errorRegistro = true;
      switch(e.code)
      {
        case "auth/email-already-in-use":
          this.mensajeErrorRegister = "el email ya está en uso"
        break;
        case "auth/invalid-email":
          this.mensajeErrorRegister = "el email es inválido"
        break;
        case "auth/weak-password":
          this.mensajeErrorRegister = "la contraseña debe tener más de 6 caracteres"
        break;
        case "auth/missing-password":
          this.mensajeErrorRegister = "la contraseña no puede estar vacía"
        break;
        case "auth/missing-email":
          this.mensajeErrorRegister = "el email no puede estar vacío"
        break;
        default:
          this.mensajeErrorRegister = "ocurrió un error inesperado"
        break;
      }
    });
  }



  errorLogin: boolean = false;
  mensajeErrorLogin: string = "";

  LogIn(userMail: string, userPassword: string)
  {
    signInWithEmailAndPassword(this.auth, userMail, userPassword).then((res) => 
    {
      if(res.user.email !== null)
        {
          this.loggedUser = res.user.email;
          this.guardarLog(this.loggedUser);
          this.router.navigateByUrl('home');
        }
    }).catch((e) => {
      console.log(e.code);
      this.errorLogin = true;
      switch(e.code)
      {
        case "auth/invalid-email":
          this.mensajeErrorLogin = "el email es inválido"
        break;
        case "auth/invalid-credential":
          this.mensajeErrorLogin = "el usuario no existe o la contraseña es incorrecta"
        break;
        case "auth/missing-password":
          this.mensajeErrorLogin = "la contraseña no puede estar vacía"
        break;
        case "auth/missing-email":
          this.mensajeErrorLogin = "el email no puede estar vacío"
        break;
        default:
          this.mensajeErrorLogin = "ocurrió un error inesperado"
        break;
      }
    }
    );
      
  }

  LogOut()
  {
    signOut(this.auth).then(() => {
      console.log(this.auth.currentUser?.email);
    })
  }

  guardarLog(userMail: string)
  {
    let col = collection(this.firestore, 'logs');
    addDoc(col, {fecha: new Date(), "user": userMail});
  }
}

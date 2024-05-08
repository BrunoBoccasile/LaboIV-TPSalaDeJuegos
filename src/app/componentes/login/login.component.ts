import { Component, inject } from '@angular/core';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { ErrorComponent } from '../error/error.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router} from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, BienvenidoComponent, ErrorComponent, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  // rutaActual: string = window.location.pathname;
  // usuariosRegistrados: any[] = []; 

  // usuarioIngresado:any = 
  // {
  //   user: "",
  //   password: ""
  // };

  // ngOnInit() : void
  // {
  //   const datosLocales = localStorage.getItem("users");
  //   if(datosLocales != null)
  //     {
  //       this.usuariosRegistrados = JSON.parse(datosLocales);
  //     }
  // }

  // iniciarSesion()
  // {
  //   if (this.usuariosRegistrados.find(m => m.user == this.usuarioIngresado.user && m.password == this.usuarioIngresado.password)) {
  //     this.router.navigate(['/login/bienvenido']);
  //   } else {
  //     this.router.navigate(['/login/error']);
  //   }
  // }
  
  irARegistro()
  {
      this.router.navigate(['/registro']);
  }

  // ngDoCheck()
  // {
  //   this.rutaActual = window.location.pathname;
  // }


  constructor(public authService: AuthService, private router: Router)
  {

  }

  userMail: string = "";
  userPWD: string = "";

  logIn()
  {
    this.authService.LogIn(this.userMail, this.userPWD);
  }

  accesoRapido(opcion: number)
  {
    switch(opcion)
    {
      case 1:
        this.userMail = "usuario@usuario.com";
        this.userPWD = "usuario";
      break;
      case 2:
        this.userMail = "admin@admin.com";
        this.userPWD = "admin123";
      break;
    }
  }
}

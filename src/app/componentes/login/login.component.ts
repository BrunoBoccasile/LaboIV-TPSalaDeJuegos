import { Component, inject } from '@angular/core';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { ErrorComponent } from '../error/error.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, BienvenidoComponent, ErrorComponent, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  rutaActual: string = window.location.pathname;
  usuariosRegistrados: any[] = []; 

  usuarioIngresado:any = 
  {
    user: "",
    password: ""
  };

  ngOnInit() : void
  {
    const datosLocales = localStorage.getItem("users");
    if(datosLocales != null)
      {
        this.usuariosRegistrados = JSON.parse(datosLocales);
      }
  }
  //inyeccion de dependencia
  constructor(private router: Router)
  {

  }
  iniciarSesion()
  {
    if (this.usuariosRegistrados.find(m => m.user == this.usuarioIngresado.user && m.password == this.usuarioIngresado.password)) {
      this.router.navigate(['/login/bienvenido']);
    } else {
      this.router.navigate(['/login/error']);
    }
  }
  
  irARegistro()
  {
      this.router.navigate(['/registro']);
  }

  ngDoCheck()
  {
    this.rutaActual = window.location.pathname;
  }

}

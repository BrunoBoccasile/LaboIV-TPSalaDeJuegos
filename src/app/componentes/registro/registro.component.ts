import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  //inyeccion de dependencia
  constructor(private router: Router)
  {

  }

  ngOnInit(): void
  {
    const datosLocales = localStorage.getItem("users");
    if(datosLocales != null)
    {
      this.usuariosRegistrados = JSON.parse(datosLocales);
    }
  }
  usuariosRegistrados: any[] = [];
  usuarioObjeto:any = 
  {
    user: "",
    password: ""
  };

  registrarse()
  {
    this.usuariosRegistrados.push(this.usuarioObjeto);

    localStorage.setItem("users",JSON.stringify(this.usuariosRegistrados))
    this.usuarioObjeto =
    {
      user: "",
      password: ""
    };
    this.router.navigate(['/login']);
  }
}

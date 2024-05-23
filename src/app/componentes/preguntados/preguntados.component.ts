import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DragonballService } from '../../services/dragonball.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
interface Respuesta {
  correcta: boolean,
  nombre: string
}

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  personajes: any[] = [];
  personajeActual: any;
  personajeListo: boolean = false;
  idActual!: number;
  respuestas: Array<Respuesta> = [];
  puntaje!: number;
  vidas!: number;

  constructor(private dragonBallService: DragonballService, private router: Router) {
  }


  ngOnInit(): void {
    this.dragonBallService.getPersonajes(58)
      .subscribe({
        next: (data: any) => {
          if (data && data.items) {
            this.personajes = data.items;
            this.inicializar();
          }
          else {
            console.error('La respuesta no contiene los datos esperados.');
          }
        },
        error: err => console.error('Error al obtener personajes:', err)
      });
  }

  inicializar(): void {
    this.asignarPersonaje();
    this.asignarPregunta();
    this.puntaje = 0;
    this.vidas = 5;
    let fondo = document.getElementById("card-fondo");
    if(fondo)
      {
        fondo.classList.add("gris");
      }
  }

  mostrarPersonajes(): void {
    console.log(this.personajes);
  }


  asignarPersonaje() {
    let idRandom = Math.floor(Math.random() * 58);
    this.personajeActual = this.personajes[idRandom];
    this.idActual = idRandom;
    console.log(this.personajeActual);
    this.personajeListo = true;
  }

  asignarPregunta() {
    let idRandom: number;
    let respuestas: Array<Respuesta> = [{ correcta: true, nombre: this.personajeActual.name }];

    for (let i = 0; i < 3; i++) {
      do {
        idRandom = Math.floor(Math.random() * 58);
      } while (idRandom == this.idActual)
      let respuesta: Respuesta = { correcta: false, nombre: this.personajes[idRandom].name };
      respuestas.push(respuesta);
    }

    console.log(respuestas);
    this.respuestas = this.mezclarRespuestas(respuestas);
  }

  mezclarRespuestas(respuestas: Respuesta[]) {
    for (let i = respuestas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [respuestas[i], respuestas[j]] = [respuestas[j], respuestas[i]];
    }
    return respuestas;
  }

  seleccionarRespuesta(correcta: boolean) {
    if (correcta) {
      this.puntaje++;
      this.flashFondo(true);
    }
    else {
      this.vidas--;
      this.flashFondo(false);
    }

    if (this.vidas > 0) {
      setTimeout(() =>{
        this.asignarPersonaje();
        this.asignarPregunta();
      }, 500)
    }
    else
    {
      this.mostrarMensajeFin();

    }

  }


  mostrarMensajeFin(): void {
    Swal.fire({
      title: '¡Juego terminado, te quedaste sin vidas!',
      text: '¿Seguir jugando?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.inicializar();
      } else if (resultado.isDenied) {
        this.router.navigateByUrl('home');
      }
    });
  }

  flashFondo(correcto: boolean): void {
    let color: string;
    let botonera = document.getElementById("botonera");
    let fondo = document.getElementById("card-fondo");
    if(correcto)
      {
        color = "verde";
      }
      else
      {
        color = "rojo";
      }


      if (fondo && botonera) {
        
        fondo.classList.add(color);
        let botones = botonera.getElementsByTagName('button');
      for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
      }
        setTimeout(() => {
          for (let i = 0; i < botones.length; i++) {
            botones[i].disabled = false;
            fondo.classList.remove(color);
            fondo.classList.add("gris");
        }
        }, 500);
    }
  }

}
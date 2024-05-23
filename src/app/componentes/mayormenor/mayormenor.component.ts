import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Carta {
  identificador: string,
  valor: number,
  rutaImagen: string
}

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css'
})

export class MayormenorComponent {
  cartas: Array<Carta> = [
    { identificador: "basto-1", valor: 1, rutaImagen: "../../../assets/images/cartas/basto-1.png" },
    { identificador: "basto-2", valor: 2, rutaImagen: "../../../assets/images/cartas/basto-2.png" },
    { identificador: "basto-3", valor: 3, rutaImagen: "../../../assets/images/cartas/basto-3.png" },
    { identificador: "basto-4", valor: 4, rutaImagen: "../../../assets/images/cartas/basto-4.png" },
    { identificador: "basto-5", valor: 5, rutaImagen: "../../../assets/images/cartas/basto-5.png" },
    { identificador: "basto-6", valor: 6, rutaImagen: "../../../assets/images/cartas/basto-6.png" },
    { identificador: "basto-7", valor: 7, rutaImagen: "../../../assets/images/cartas/basto-7.png" },
    { identificador: "basto-8", valor: 8, rutaImagen: "../../../assets/images/cartas/basto-8.png" },
    { identificador: "basto-9", valor: 9, rutaImagen: "../../../assets/images/cartas/basto-9.png" },
    { identificador: "basto-10", valor: 10, rutaImagen: "../../../assets/images/cartas/basto-10.png" },
    { identificador: "basto-11", valor: 11, rutaImagen: "../../../assets/images/cartas/basto-11.png" },
    { identificador: "basto-12", valor: 12, rutaImagen: "../../../assets/images/cartas/basto-12.png" },

    { identificador: "oro-1", valor: 1, rutaImagen: "../../../assets/images/cartas/oro-1.png" },
    { identificador: "oro-2", valor: 2, rutaImagen: "../../../assets/images/cartas/oro-2.png" },
    { identificador: "oro-3", valor: 3, rutaImagen: "../../../assets/images/cartas/oro-3.png" },
    { identificador: "oro-4", valor: 4, rutaImagen: "../../../assets/images/cartas/oro-4.png" },
    { identificador: "oro-5", valor: 5, rutaImagen: "../../../assets/images/cartas/oro-5.png" },
    { identificador: "oro-6", valor: 6, rutaImagen: "../../../assets/images/cartas/oro-6.png" },
    { identificador: "oro-7", valor: 7, rutaImagen: "../../../assets/images/cartas/oro-7.png" },
    { identificador: "oro-8", valor: 8, rutaImagen: "../../../assets/images/cartas/oro-8.png" },
    { identificador: "oro-9", valor: 9, rutaImagen: "../../../assets/images/cartas/oro-9.png" },
    { identificador: "oro-10", valor: 10, rutaImagen: "../../../assets/images/cartas/oro-10.png" },
    { identificador: "oro-11", valor: 11, rutaImagen: "../../../assets/images/cartas/oro-11.png" },
    { identificador: "oro-12", valor: 12, rutaImagen: "../../../assets/images/cartas/oro-12.png" },

    { identificador: "espada-1", valor: 1, rutaImagen: "../../../assets/images/cartas/espada-1.png" },
    { identificador: "espada-2", valor: 2, rutaImagen: "../../../assets/images/cartas/espada-2.png" },
    { identificador: "espada-3", valor: 3, rutaImagen: "../../../assets/images/cartas/espada-3.png" },
    { identificador: "espada-4", valor: 4, rutaImagen: "../../../assets/images/cartas/espada-4.png" },
    { identificador: "espada-5", valor: 5, rutaImagen: "../../../assets/images/cartas/espada-5.png" },
    { identificador: "espada-6", valor: 6, rutaImagen: "../../../assets/images/cartas/espada-6.png" },
    { identificador: "espada-7", valor: 7, rutaImagen: "../../../assets/images/cartas/espada-7.png" },
    { identificador: "espada-8", valor: 8, rutaImagen: "../../../assets/images/cartas/espada-8.png" },
    { identificador: "espada-9", valor: 9, rutaImagen: "../../../assets/images/cartas/espada-9.png" },
    { identificador: "espada-10", valor: 10, rutaImagen: "../../../assets/images/cartas/espada-10.png" },
    { identificador: "espada-11", valor: 11, rutaImagen: "../../../assets/images/cartas/espada-11.png" },
    { identificador: "espada-12", valor: 12, rutaImagen: "../../../assets/images/cartas/espada-12.png" },

    { identificador: "copa-1", valor: 1, rutaImagen: "../../../assets/images/cartas/copa-1.png" },
    { identificador: "copa-2", valor: 2, rutaImagen: "../../../assets/images/cartas/copa-2.png" },
    { identificador: "copa-3", valor: 3, rutaImagen: "../../../assets/images/cartas/copa-3.png" },
    { identificador: "copa-4", valor: 4, rutaImagen: "../../../assets/images/cartas/copa-4.png" },
    { identificador: "copa-5", valor: 5, rutaImagen: "../../../assets/images/cartas/copa-5.png" },
    { identificador: "copa-6", valor: 6, rutaImagen: "../../../assets/images/cartas/copa-6.png" },
    { identificador: "copa-7", valor: 7, rutaImagen: "../../../assets/images/cartas/copa-7.png" },
    { identificador: "copa-8", valor: 8, rutaImagen: "../../../assets/images/cartas/copa-8.png" },
    { identificador: "copa-9", valor: 9, rutaImagen: "../../../assets/images/cartas/copa-9.png" },
    { identificador: "copa-10", valor: 10, rutaImagen: "../../../assets/images/cartas/copa-10.png" },
    { identificador: "copa-11", valor: 11, rutaImagen: "../../../assets/images/cartas/copa-11.png" },
    { identificador: "copa-12", valor: 12, rutaImagen: "../../../assets/images/cartas/copa-12.png" }
  ];
  cartaActual!: Carta;
  indiceCartaActual!: number;
  puntos!: number;

  constructor(public router: Router) {
    this.inicializar();
  }

  inicializar(): void{
    this.mezclarCartas(this.cartas);
    this.cartaActual = this.cartas[0];
    this.indiceCartaActual = 0;
    this.puntos = 0;
  }

  siguienteCarta(opcion: string) {
    this.indiceCartaActual++;
    let cartaAnterior = this.cartaActual;
    this.cartaActual = this.cartas[this.indiceCartaActual];
    let correcto: boolean = false;
    if (
      (this.cartaActual.valor > cartaAnterior.valor && opcion == "mayor") 
      ||
      (this.cartaActual.valor < cartaAnterior.valor && opcion == "menor")
      ||
      (this.cartaActual.valor == cartaAnterior.valor && opcion == "igual")
    )
    {
      this.puntos++;
      correcto = true;
    }

    if(this.indiceCartaActual == 47)
      {
        this.mostrarMensajeFin();
      }

      this.flashFondo(correcto);
  }

  mezclarCartas(cartas: Carta[]) {
    for (let i = cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    return cartas;
  }

  mostrarMensajeFin(): void {
    Swal.fire({
      title: '¡Juego terminado!',
      text: '¿Seguir jugando?',
      icon: 'info',
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
    let animacion: string;
    let btnGroup = document.getElementById("btn-group");

    if(correcto)
      {
        animacion = "flash-green";
      }
      else
      {
        animacion = "flash-red";
      }

    let fondo = document.getElementById("container-0");
    if (fondo && btnGroup) {

      let botones = btnGroup.getElementsByTagName('button');
      for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
      }
      fondo.classList.add(animacion);
        setTimeout(() => {
          fondo.classList.remove(animacion);
          for (let i = 0; i < botones.length; i++) {
            botones[i].disabled = false;
        }
        }, 500);
    }
}
}

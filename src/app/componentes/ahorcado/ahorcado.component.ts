import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  palabras = ["mariposa", "elefante", "ventilador", "computadora", "bicicleta", "telefono", "avioneta", "universidad",
    "television", "electricidad", "marinero", "biblioteca", "helicoptero", "estudiante", "profesor",
    "medicina", "alfabeto", "naturaleza", "matematicas", "aeropuerto", "paraguas", "restaurante", "murcielago",
    "monumento", "fotografia", "electricista", "vegetales", "lavadora", "escritorio", "microscopio",
    "hipopotamo", "panaderia", "pizzeria", "telecomunicaciones", "ventanilla", "automovil", "iluminacion",
    "insecticida", "bicicleta", "caballero", "azucarera", "astronomia", "dentadura", "espectador", "invitacion",
    "hidratante", "matrimonio", "navegacion", "radiografia", "telequinesis", "traductor", "bicicleta",
    "conocimiento", "dedicatoria", "incertidumbre", "inequivoco", "temperatura", "diccionario", "morfologia",
    "clarinete", "aerodinamica", "planetario", "astronave", "educacion", "vocabulario", "administracion",
    "quiropractico", "hidroavion", "calificacion", "ventanilla", "economia", "campeonato", "alimentacion",
    "agricultura", "telepatia", "palabra", "entusiasmo", "invitacion", "cumpleanos", "hermanastra", "camiseta",
    "mariposa", "ventilador", "complejidad", "maternidad", "herramienta", "pesadilla", "aventura", "escalera",
    "comunicacion", "dificultad", "temporal", "fotografia", "comunista", "fotografia", "matematicas", "intensidad",
    "nacionalidad", "ventilador", "civilizacion", "bicicleta", "romanticismo", "conversacion", "romantico",
    "construccion", "azucarero", "astronomia", "vegetacion", "escritor", "residencia", "increible", "diversion",
    "hipopotamico", "radiografia", "fotocopia", "bicicleta", "telescopio", "hidratacion", "carretera",
    "gasolinera", "pantalla", "pelicula", "bibliotecario", "sillon", "automovil", "pintura", "catedral",
    "universidad", "terremoto", "radiografia", "camarero", "enfermero", "panaderia", "furgoneta", "plomero",
    "cirugia", "anestesia", "medico", "dentista", "adivinanza", "naturaleza", "abecedario", "multitud",
    "imaginacion", "baloncesto", "entretenimiento", "tradicion", "humorista", "telecomunicaciones",
    "verduleria", "mecanografia", "personalidad", "juventud", "aeropuerto", "presidente", "electronica",
    "facilidad", "misterioso", "bibliografia", "hipotetico", "hospitalario", "temperamental", "veterinario",
    "fotografia", "complicado", "transformacion", "caminante", "calendario", "helicoptero", "lavanderia",
    "microondas", "cuchilleria", "tremendo", "delicado", "necesidad", "oceano", "paralelo", "incomprensible"];
  palabraAdivinadaPorAhora!: string;
  palabraAAdivinar!: string
  fallos!: Array<string>;
  numFallos!: number;
  numAciertos!: number;
  botones!: Array<{letra: string, estado: string}>;

  constructor(public router: Router) {
    this.inicializar();
  }

  inicializar(): void {
    this.fallos = [];
    this.numFallos = 0;
    this.numAciertos = 0;
    let numero = Math.floor(Math.random() * this.palabras.length);
    this.palabraAAdivinar = this.palabras[numero];
    this.inicializarBotones();
    this.palabraAdivinadaPorAhora = "";
    for (let i = 0; i < this.palabraAAdivinar.length; i++) {
      this.palabraAdivinadaPorAhora += "_";
    }
  }

  inicializarBotones(): void{
    this.botones = [];
    for(let i=0 ; i<this.letras.length ; i++)
      {
        this.botones.push({letra: this.letras[i], estado: "boton-no-pulsado"});
      }
  }
  botonClickeado(boton: {letra:string, estado:string}): void {
    if (!this.letraAcertada(boton.letra)) {
      this.aumentarFallos(boton.letra);
      if (this.numFallos > 5) {
        this.mostrarMensajePerder();
      }
      boton.estado = "boton-letra-no-acertada";
      
    }
    else
    {
      if(this.numAciertos == this.palabraAAdivinar.length)
        {
          this.mostrarMensajeGanar();
        }
        boton.estado = "boton-letra-acertada";
      }
    }
    
    letraAcertada(letra: string): boolean {
      let longitud = this.palabraAAdivinar.length;
      let letraAcertada = false;
      
      
      for (let i = 0; i < longitud; i++) {
        if (letra == this.palabraAAdivinar[i].toUpperCase()) {
          this.palabraAdivinadaPorAhora = this.palabraAdivinadaPorAhora.substring(0, i) + letra + this.palabraAdivinadaPorAhora.substring(i + 1);
          letraAcertada = true;
          this.numAciertos++;
        }
      }
      return letraAcertada;
    }
    
  aumentarFallos(letra: string): void {
    this.fallos.push(letra);
    this.numFallos++;
  }

  mostrarMensajePerder(): void {
    Swal.fire({
      title: '¡Perdiste!',
      text: '¿Seguir jugando?',
      icon: 'error',
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

  mostrarMensajeGanar(): void {
    Swal.fire({
      title: '¡Ganaste!',
      text: '¿Seguir jugando?',
      icon: 'success',
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
}

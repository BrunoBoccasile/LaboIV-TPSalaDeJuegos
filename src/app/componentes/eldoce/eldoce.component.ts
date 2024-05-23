import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import Swal from 'sweetalert2';

interface Dado {
  valor: number,
  rutaImagen: string
}

@Component({
  selector: 'app-eldoce',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './eldoce.component.html',
  styleUrl: './eldoce.component.css'
})
export class EldoceComponent {
  //la maquina tira el dado dos veces, no se revela.
  //el usuario tira el dado dos veces automaticamente.
  //el usuario decide si tirar un dado mas o quedarse
  //se revelan los dados de la maquina
  //si los dados llegan a sumar 9, la maquina se queda. si no, pide dados hasta llegar a 9 o mas.
  //gana el usuario si la maquina se paso o si logro mas puntos que la maquina

  dados: Array<Dado> =
    [{ valor: 1, rutaImagen: "../../../assets/images/eldoce/uno.png" },
    { valor: 2, rutaImagen: "../../../assets/images/eldoce/dos.png" },
    { valor: 3, rutaImagen: "../../../assets/images/eldoce/tres.png" },
    { valor: 4, rutaImagen: "../../../assets/images/eldoce/cuatro.png" },
    { valor: 5, rutaImagen: "../../../assets/images/eldoce/cinco.png" },
    { valor: 6, rutaImagen: "../../../assets/images/eldoce/seis.png" },
    ]
  dadosMaquina: Array<Dado> = [];
  dadosUsuario: Array<Dado> = [];
  primeraTirada!: boolean;
  dadosMaquinaRevelados!: boolean;
  sumaUsuario!: number;
  sumaMaquina!: number;

  constructor(private router: Router) {
    this.inicializar();
  }

  inicializar(): void {
    this.dadosUsuario = [];
    this.dadosMaquina = [];
    this.asignarDados(this.dadosMaquina, 2);
    this.disableBoton("btnPlantarse", true);
    this.disableBoton("btnTirar", false);
    this.dadosMaquinaRevelados = false;
    this.sumaUsuario = 0;
    this.sumaMaquina = 0;
    this.primeraTirada = true;
  }

  tirarDados(arrayDados: Array<Dado>): void {
    let cantidad = 1;
    if (this.primeraTirada) {
      cantidad = 2;
      this.disableBoton("btnPlantarse", false);
    }
    this.asignarDados(arrayDados, cantidad);
    if (this.primeraTirada) {
      this.sumaUsuario = this.dadosUsuario[0].valor + this.dadosUsuario[1].valor;
      this.primeraTirada = false;
    }
    else {
      this.sumaUsuario += this.dadosUsuario[this.dadosUsuario.length - 1].valor;
    }





    if (this.sumaUsuario == 12) {
      this.disableBoton("btnTirar", true);
    }
    else if (this.sumaUsuario > 12) {
      this.disableBoton("btnTirar", true);
      this.disableBoton("btnPlantarse", true);
      this.terminarJuego(true);
    }
  }

  plantarse(): void {
    //deshabilito el boton tirar y plantarse
    this.disableBoton("btnTirar", true);
    this.disableBoton("btnPlantarse", true);


    setTimeout(() => {
      this.sumaMaquina = this.dadosMaquina[0].valor + this.dadosMaquina[1].valor;
      //maquina muestra dados
      console.log("La maquina muestra sus dos dados (" + this.sumaMaquina + ")")
      this.dadosMaquinaRevelados = true;
      //tira la maquina simulando tiempo entre tiradas
      this.tirarDadosMaquina();

    }, 1000);


  }

  tirarDadosMaquina() {
    setTimeout(() => {


      if (this.sumaMaquina < 9) {
        this.asignarDados(this.dadosMaquina, 1);
        this.sumaMaquina += this.dadosMaquina[this.dadosMaquina.length - 1].valor;
        console.log("la maquina tira un dado (" + this.sumaMaquina + ")");
        this.tirarDadosMaquina();
      }
      else if (this.sumaMaquina >= 9 && this.sumaMaquina <= 12) {
        console.log("la maquina se queda (" + this.sumaMaquina + ")");
        this.terminarJuego(false, false);
      }
      else {
        console.log("la maquina pierde (" + this.sumaMaquina + ")");
        this.terminarJuego(false, true);
      }
    }, 1000)

  }

  terminarJuego(sePasoUsuario: boolean, sePasoMaquina?: boolean) {
    if (sePasoUsuario) {
      //jugador pierde
      this.mostrarMensajePerder("Perdiste, sumaste " + this.sumaUsuario + " y te pasaste de 12");
    }
    else if (sePasoMaquina) {
      //jugador gana 
      this.mostrarMensajeGanar("Ganaste, la máquina sumó " + this.sumaMaquina  + " y se pasó de 12");
    }
    else if (!sePasoUsuario && !sePasoMaquina) {
      if (this.sumaUsuario > this.sumaMaquina) {
        //gana usuario
        this.mostrarMensajeGanar("Ganaste sumando " + this.sumaUsuario);
      }
      else if (this.sumaUsuario < this.sumaMaquina) {
        //pierde usuario
        this.mostrarMensajePerder("Perdiste, la maquina gana sumando " + this.sumaMaquina);
      }
      else {
        //empate
        this.mostrarMensajeEmpatar("Empate, la máquina te igualó sumando " + this.sumaMaquina);
      }
    }
  }

  disableBoton(nombreBoton: string, estado: boolean) {
    let boton = document.getElementById(nombreBoton) as HTMLButtonElement;

    if (boton) {
      boton.disabled = estado;
    }
  }

  asignarDados(arrayDados: Array<Dado>, cantidad: number): void {
    for (let i = 0; i < cantidad; i++) {
      arrayDados.push(this.dados[Math.floor(Math.random() * this.dados.length)]); //asigna un dado aleatorio al array de dados del parametro
    }
  }

  mostrarMensajeGanar(mensaje: string): void {
    Swal.fire({
      title: mensaje,
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

  mostrarMensajePerder(mensaje: string): void {
    Swal.fire({
      title: mensaje,
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

  mostrarMensajeEmpatar(mensaje: string): void {
    Swal.fire({
      title: mensaje,
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
}

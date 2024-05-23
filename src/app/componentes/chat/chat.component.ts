import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Timestamp, orderBy, query } from 'firebase/firestore';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnDestroy, OnInit{
  newMensaje!: string;
  public coleccionMensajes: any[] = [];
  public countMensajes: number = 0;
  private sub!: Subscription;
  public mensajesObtenidos: boolean = false;
  @ViewChild('mensajes-container') mensajesContainer!: ElementRef;

  constructor(public firestore: Firestore, public authService: AuthService) { }
  ngOnInit(): void {
    this.obtenerMensajes();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.mensajesObtenidos = false;
  }

 
  enviarMensaje() {
    if (this.newMensaje.trim() !== '')
      {
        this.guardarMensaje(this.newMensaje)
        this.newMensaje = '';
      }
  }

  guardarMensaje(mensaje: string) {
    let col = collection(this.firestore, 'mensajes');
    addDoc(col, { fecha: new Date(), user: this.authService.auth.currentUser?.email, mensaje: mensaje })
  }

  obtenerMensajes() {
    let col = collection(this.firestore, 'mensajes');
    let q = query(col, orderBy('fecha', 'asc'));  // Ordenar por fecha en orden ascendente

    const observable = collectionData(q, { idField: 'id' });

    this.sub = observable.subscribe((respuesta) => {
      this.coleccionMensajes = respuesta;
      this.countMensajes = this.coleccionMensajes.length;
      this.mensajesObtenidos = true;
    });
  }

  formatearFecha(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

}
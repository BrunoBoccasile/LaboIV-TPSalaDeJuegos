import { Injectable, OnDestroy } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy{
  public coleccionMensajes: any[] = [];
  public countMensajes: number = 0;
  private sub!:Subscription;

  constructor(public firestore: Firestore, public auth: Auth){}

  ngOnDestroy(): void {

    this.sub.unsubscribe();

 }

  guardarMensaje(mensaje: string)
  {
    let col = collection(this.firestore, 'mensajes');
    addDoc(col, {fecha: new Date(), user: this.auth.currentUser?.email, mensaje: mensaje})
  }

  obtenerMensajes()
  {
    let col = collection(this.firestore, 'mensajes');
    const observable = collectionData(col);

    this.sub = observable.subscribe((respuesta) =>{

      this.coleccionMensajes = respuesta;

      this.countMensajes = this.coleccionMensajes.length;
    })

  }
}

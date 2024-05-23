import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragonballService {

  api: string = 'https://dragonball-api.com/api/characters';

  constructor(private http: HttpClient) {
  }

  getPersonajes(cantidad: number) 
  {
    return this.http.get<any[]>(this.api + '?limit=' + cantidad);
  }

  getPersonaje(idPersonaje:number): Observable<any>{
    return this.http.get<any[]>(this.api +'/' + idPersonaje);
  }


}

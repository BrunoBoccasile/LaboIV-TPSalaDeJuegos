import { Component } from '@angular/core';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NgClass, NgStyle } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, FormsModule, HomeComponent, RouterLink, NgClass, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "TP Sala de juegos";
  constructor(public auth: AuthService){}
  logOut()
  {
    this.auth.LogOut();
  }

  
}


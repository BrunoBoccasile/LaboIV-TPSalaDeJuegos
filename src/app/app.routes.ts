import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', loadComponent:()=> import('./componentes/home/home.component').then(c => c.HomeComponent) },
    { path: 'login', loadComponent:()=> import('./componentes/login/login.component').then(c => c.LoginComponent), 
        children:
        [
            {
                path: "bienvenido",
                component: BienvenidoComponent
            },
            {
                path: "error",
                component: ErrorComponent
            }
        ]
    },
    { path: 'registro', loadComponent:()=> import('./componentes/registro/registro.component').then(c => c.RegistroComponent) },
    { path: 'quiensoy', loadComponent:()=> import('./componentes/quiensoy/quiensoy.component').then(c => c.QuiensoyComponent) },
    { path: 'ahorcado', loadComponent:()=> import('./componentes/ahorcado/ahorcado.component').then(c => c.AhorcadoComponent)},
    { path: 'mayormenor', loadComponent:()=> import('./componentes/mayormenor/mayormenor.component').then(c => c.MayormenorComponent)},
    { path: 'preguntados', loadComponent:()=> import('./componentes/preguntados/preguntados.component').then(c => c.PreguntadosComponent)},
    { path: 'chat', loadComponent:()=> import('./componentes/chat/chat.component').then(c => c.ChatComponent)},
    { path: 'eldoce', loadComponent:()=> import('./componentes/eldoce/eldoce.component').then(c => c.EldoceComponent)}

];

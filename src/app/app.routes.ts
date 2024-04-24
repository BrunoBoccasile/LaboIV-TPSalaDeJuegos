import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, 
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
    { path: 'registro', component: RegistroComponent },
    { path: 'quiensoy', component: QuiensoyComponent }

];

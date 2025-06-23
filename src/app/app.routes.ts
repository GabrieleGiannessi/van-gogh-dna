import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReadComponent } from './pages/read/read.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'read', component: ReadComponent }, 
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent}, 
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    
];
    
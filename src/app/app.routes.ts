import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReadComponent } from './pages/read/read.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'read', component: ReadComponent }, 
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    
];
    
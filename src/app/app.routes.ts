import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UploadComponent } from './pages/upload/upload.component';
import { authGuard } from './guards/auth.guard';
import { DocumentsComponent } from './pages/documents/documents.component';
import { docsGuard } from './guards/docs.guard';
import { ModifyDocumentComponent } from './pages/modify/modify.component';
import { modifyGuard } from './guards/modify.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'upload', component: UploadComponent, canActivate: [authGuard], title: 'Upload' },
  { path: 'docs/:sub', component: DocumentsComponent, canActivate: [docsGuard, authGuard], title: 'Documents' }, 
  { path: 'modify/:id', component: ModifyDocumentComponent, canActivate: [modifyGuard, authGuard], title: 'Modify' }, 
  { path: '**', redirectTo: 'home' },
];


    
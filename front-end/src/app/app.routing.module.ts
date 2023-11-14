import { NgModule } from "@angular/core"; 
import { RouterModule, Routes } from "@angular/router"; 

const routes: Routes = [
  { path: 'insertar-libro', loadComponent: () => import('src/app/pages/insert-libros/insert-libros.component').then(m => m.InsertLibrosComponent) },
  { path: 'ver-libros', loadComponent: () => import('src/app/pages/get-all-libros/get-all-libros.component').then(m => m.GetAllLibrosComponent) },
  { path: 'informacion-libro/:id', loadComponent: () => import('src/app/pages/libro/libro.component').then(m => m.LibroComponent) },
  { path: '', redirectTo: 'insertar-libro', pathMatch: 'full' },
  { path: '**', redirectTo: 'insertar-libro' }
]; 
  
@NgModule({ 
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
}) 
export class MainRoutingModule {}
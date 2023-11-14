import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosService } from 'src/app/services/libros.service';
import { librosI } from 'src/app/interfaces';
import { HttpErrorResponse } from "@angular/common/http";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-get-all-libros',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './get-all-libros.component.html',
  styleUrls: ['./get-all-libros.component.scss']
})
export class GetAllLibrosComponent implements OnInit {

  // Para almacenar la información de los libros
  libros: librosI[] = [];
  isLoadingData: boolean = false; // Para indicar carga de datos

  constructor( private librosService: LibrosService ){ }

  ngOnInit(): void {
    this.obtenerDatos();
  }


  obtenerDatos() {
    this.isLoadingData = true;
     // Llamamos a la api para obtener los datos de los libros
     this.librosService.obtenerLibros().subscribe({
      next: (data) => {
        this.libros = data.libros || [];
        this.isLoadingData = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingData = false;
      }
    })
  }

}

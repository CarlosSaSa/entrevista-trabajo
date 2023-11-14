import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { LibrosService } from 'src/app/services/libros.service';
import { HttpErrorResponse } from "@angular/common/http";
import { librosI } from 'src/app/interfaces';


@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.scss']
})
export class LibroComponent implements OnInit {

  libroId: number | string = '0';
  libro: librosI | null = null;
  isLoadingInformacion: boolean = false;

  constructor( private route: ActivatedRoute, private libroService: LibrosService ){}

  ngOnInit() {
    this.libroId = this.route.snapshot.paramMap.get('id') || '0';
    this.obtenerInformacionLibro();
  }
  
  // Para obtener información del libro
  obtenerInformacionLibro() {
    this.isLoadingInformacion = true;
    this.libroService.obtenerInformacionLibro( this.libroId ).subscribe({
      next: (data) => {
        this.libro = data.libro || null;
        this.isLoadingInformacion = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoadingInformacion = false;
      }
    })
  }

  

}

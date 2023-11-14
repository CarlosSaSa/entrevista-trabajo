import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { librosI, librosResponseI, responseI } from '../interfaces';

interface libroResponseI extends responseI {
  libro: librosI | null
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  // Host
  private API_URL = 'http://localhost:5002';

  constructor( private http: HttpClient ) { }

  // Para enviar los datos a la API
  ingresarLibro( nombre: string, anio: number, autor: string ) {
    return this.http.post<responseI>(`${this.API_URL}/ingresar-libro`, { nombre, anio, autor });
  }

  // Para obtener todos los libros
  obtenerLibros() {
    return this.http.get<librosResponseI>(`${this.API_URL}/listar-libros`);
  }

  // Para obtener información de un libro
  obtenerInformacionLibro( id: number | string ){
    return this.http.get<libroResponseI>(`${this.API_URL}/informacion-libro/${id}`);
  }


}

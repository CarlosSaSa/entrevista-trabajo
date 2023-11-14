import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { LibrosService } from 'src/app/services/libros.service';
import { validadorAnios } from 'src/app/utils/validators';

@Component({
  selector: 'app-insert-libros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './insert-libros.component.html',
  styleUrls: ['./insert-libros.component.scss']
})
export class InsertLibrosComponent {

  librosForm!: FormGroup;
  responseType: 'error' | 'success' | '' = '';
  mensajeServer = '';

  constructor( private fb: FormBuilder, private librosService: LibrosService ){
  }

  ngOnInit(): void {
      this.initForm();
  }

  // Para inicializar el formulario
  initForm(){
    this.librosForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(120)]],
      anio: ['', [Validators.required, validadorAnios() ]],
      autor: ['', Validators.required]
    })
  }

  // Para el submit
  ingresarLibro() {
    // Si es invalido retornamos
    if ( this.librosForm.invalid ) return;

    // Obtenemos los datos
    const { nombre, anio, autor } = this.librosForm.value;
  
    // Enviar a la API
    this.librosService.ingresarLibro( nombre, anio, autor ).subscribe({
      next: (data) => {
        this.responseType = 'success';
        this.mensajeServer = data.mensaje || 'Registro ingresado correctamente';
        setTimeout( () => this.mensajeServer = '', 3000 );
        this.resetForm();
      },
      error: ( err: HttpErrorResponse ) => {
        this.responseType = 'error';
        this.mensajeServer = err.error.mensaje || 'Ha ocurrido un error, intente mas tarde';
        setTimeout( () => this.mensajeServer = '', 3000 );
      }
    })
  }

  // Reseteamos el form
  resetForm() {
    this.librosForm.reset({  nombre: '', anio: '', autor: '' })
  }

}

import { AbstractControl, ValidatorFn } from "@angular/forms";

// Validador de años
export const validadorAnios = (): ValidatorFn => {
    return ( control: AbstractControl ) => {

        // Obtenemos el valor del form
        const value = control.value;

        // Si el año es menor a 1900 entonces es un error
        if ( Number(value) < 1900 ) return { isLt: true }

        // Si el año es mayor a 2023 entonces es un error
        if ( Number( value ) > 2023 ) return { isGt: true }
        return null;

    }

}
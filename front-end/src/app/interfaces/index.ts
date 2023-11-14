export interface responseI {
    estado: boolean,
    mensaje: string
}

// Interface para los libros
export interface librosResponseI extends responseI {
    libros: librosI[]
}

export interface librosI {
    libro_id: number,
    nombre: string,
    anio: number,
    autor: string
}
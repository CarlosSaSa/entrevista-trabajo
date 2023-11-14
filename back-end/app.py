from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from models.libroModel import Libro
from db.db import crear_conexion
from psycopg2 import Error
from fastapi.middleware.cors import CORSMiddleware

# Creamos una instancia de fastapi
app = FastAPI()

# Habilitamos cors
app.add_middleware( CORSMiddleware, allow_origins=['*'],  allow_methods = ['POST', 'GET'] )

# Creamos un metodo post para aceptar datos
@app.post('/ingresar-libro')
def ingresarLibros( libroModel: Libro  ):
    libro = libroModel.model_dump() # Lo convetirmos a un diccionario
    # Extraemos los datos para realizar las validaciones
    nombre_libro: str = libro.get('nombre', '')
    anio: int = libro.get('anio', 0)
    autor: str = libro.get('autor', '')

    # Si el nombre del libro sobrepasa los 120 caracteres entonces es un error
    if not nombre_libro or nombre_libro == '' or len(nombre_libro) > 120:
        return JSONResponse( status_code = status.HTTP_400_BAD_REQUEST, content = { 'estado': False, 'mensaje': "El total de caracteres del nombre de libro no puede ser mayor a 120 " } )

    # Si el anio es menor a 1900 o mayor a 2023 
    if anio < 1900 or anio > 2023:
        return JSONResponse( status_code = status.HTTP_400_BAD_REQUEST, content = { 'estado': False, 'mensaje': "El año tiene que ser mayor a 1980 y menor a 2023" } )

    conn = None
    cursor = None
    try:
        # Creamos una conexión
        conn = crear_conexion()
        cursor = conn.cursor()
        sql_insert_libro = "INSERT INTO libro(nombre, anio, autor) VALUES (%s, %s, %s);"
        cursor.execute(sql_insert_libro, ( nombre_libro, anio, autor ))
        conn.commit()
        return JSONResponse( status_code = status.HTTP_200_OK, content = { 'estado': True, 'mensaje': "Libro ingresado correctamente" } )
    except (Exception, Error ) as e:
        # print('Ha ocurrido un error: ', e, type(e))
        return JSONResponse( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, content = { 'estado': False, 'mensaje': "Ha ocurrido un error de servidor, intente mas tarde" } )
    finally:
        if conn:
            conn.close()
        if cursor:
            cursor.close()

# Endpoint para listar todos los libros
@app.get('/listar-libros')
def listarLibros():
    # Creamos unos variables de conexión
    conn = None
    cursor = None
    try:
        # Creamos una conexión
        conn = crear_conexion()
        cursor = conn.cursor()
        sql_libros = "SELECT libro_id, nombre, anio, autor FROM libro"
        cursor.execute(sql_libros )
        libros = cursor.fetchall()

        return JSONResponse( status_code = status.HTTP_200_OK, content = { 'estado': True, 'mensaje': "Libros obtenidos correctamente", "libros": libros } )
    except (Exception, Error ) as e:
        # print('Ha ocurrido un error: ', e, type(e))
        return JSONResponse( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, content = { 'estado': False, 'mensaje': "Ha ocurrido un error de servidor, intente mas tarde" } )
    finally:
        if conn:
            conn.close()
        if cursor:
            cursor.close()


# Para obtener la información de un libro
@app.get('/informacion-libro/{id}')
def obtenerInformacionLibro(id: int):
    # Creamos unos variables de conexión
    conn = None
    cursor = None
    try:
        # Creamos una conexión
        conn = crear_conexion()
        cursor = conn.cursor()
        sql_libros = "SELECT libro_id, nombre, anio, autor FROM libro WHERE libro_id = %s"
        cursor.execute(sql_libros, ( id, ) )
        libro = cursor.fetchone()

        return JSONResponse( status_code = status.HTTP_200_OK, content = { 'estado': True, 'mensaje': "Libro obtenido correctamente", "libro": libro } )
    except (Exception, Error ) as e:
        # print('Ha ocurrido un error: ', e, type(e))
        return JSONResponse( status_code = status.HTTP_500_INTERNAL_SERVER_ERROR, content = { 'estado': False, 'mensaje': "Ha ocurrido un error de servidor, intente mas tarde" } )
    finally:
        if conn:
            conn.close()
        if cursor:
            cursor.close()




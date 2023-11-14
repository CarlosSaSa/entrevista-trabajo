# Modelo de fast api
from pydantic import BaseModel

class Libro( BaseModel ):
    nombre: str
    anio: int
    autor: str

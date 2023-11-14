from psycopg2 import connect
from psycopg2.extensions import connection
from psycopg2.extras import RealDictCursor

DEV_POSTGRES = {
    'user': 'postgres',
    'password': '123456',
    'host': 'localhost',
    'port': 5432,
    'database': 'libros',
    "cursor_factory": RealDictCursor
}

# Creamos una conexion
def crear_conexion() -> connection:
    return connect( **DEV_POSTGRES )
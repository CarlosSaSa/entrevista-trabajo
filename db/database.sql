
DROP DATABASE IF EXISTS testlibros;
CREATE DATABASE testlibros;

\c testlibros;

CREATE TABLE libro(
    libro_id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    anio INT NOT NULL,
    autor VARCHAR(100) NOT NULL
);
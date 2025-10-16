-- PostgreSQL schema inicial basado en requisitos
CREATE TABLE IF NOT EXISTS socios (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  dni TEXT NOT NULL UNIQUE,
  numero_socio TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS libros (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  isbn TEXT NOT NULL UNIQUE,
  estado TEXT NOT NULL CHECK (estado IN ('disponible','prestado'))
);

CREATE TABLE IF NOT EXISTS prestamos (
  id SERIAL PRIMARY KEY,
  socio_id INTEGER NOT NULL REFERENCES socios(id),
  libro_id INTEGER NOT NULL REFERENCES libros(id),
  fecha_inicio DATE NOT NULL,
  fecha_devolucion DATE NOT NULL,
  devuelto BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT un_libro_prestamo_activo UNIQUE (libro_id) DEFERRABLE INITIALLY DEFERRED
);

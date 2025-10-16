import { pool } from '../db/conexion.js'

export async function listarPrestamos(req, res) {
  const { rows } = await pool.query('SELECT * FROM prestamos ORDER BY id DESC')
  res.json(rows)
}

export async function crearPrestamo(req, res) {
  const { socio_id, libro_id, fecha_inicio, fecha_devolucion } = req.body
  if (!socio_id || !libro_id || !fecha_inicio || !fecha_devolucion) {
    return res.status(400).json({ error: 'Faltan campos' })
  }
  try {
    await pool.query('BEGIN')
    // Verifica libro disponible
    const { rows: libros } = await pool.query('SELECT estado FROM libros WHERE id=$1 FOR UPDATE', [libro_id])
    if (!libros.length) throw new Error('Libro no existe')
    if (libros[0].estado !== 'disponible') {
      await pool.query('ROLLBACK')
      return res.status(409).json({ error: 'Libro no disponible' })
    }
    // Crea préstamo
    const { rows: p } = await pool.query(
      'INSERT INTO prestamos (socio_id, libro_id, fecha_inicio, fecha_devolucion, devuelto) VALUES ($1,$2,$3,$4,false) RETURNING *',
      [socio_id, libro_id, fecha_inicio, fecha_devolucion]
    )
    // Marca libro
    await pool.query('UPDATE libros SET estado=$1 WHERE id=$2', ['prestado', libro_id])
    await pool.query('COMMIT')
    res.status(201).json(p[0])
  } catch (e) {
    await pool.query('ROLLBACK')
    res.status(500).json({ error: e.message })
  }
}

export async function devolverPrestamo(req, res) {
  const id = req.params.id
  try {
    await pool.query('BEGIN')
    const { rows } = await pool.query('SELECT * FROM prestamos WHERE id=$1 FOR UPDATE', [id])
    if (!rows.length) {
      await pool.query('ROLLBACK')
      return res.status(404).json({ error: 'Préstamo no encontrado' })
    }
    const prestamo = rows[0]
    if (prestamo.devuelto) {
      await pool.query('ROLLBACK')
      return res.status(409).json({ error: 'El préstamo ya fue devuelto' })
    }
    await pool.query('UPDATE prestamos SET devuelto=true WHERE id=$1', [id])
    await pool.query('UPDATE libros SET estado=$1 WHERE id=$2', ['disponible', prestamo.libro_id])
    await pool.query('COMMIT')
    res.json({ ok: true })
  } catch (e) {
    await pool.query('ROLLBACK')
    res.status(500).json({ error: e.message })
  }
}

import { pool } from '../db/conexion.js'

export async function listarPrestamos(req, res) {
  const { rows } = await pool.query(`
    SELECT 
      p.id,
      p.socio_id,
      p.libro_id,
      p.fecha_inicio,
      p.fecha_devolucion,
      p.devuelto,
      p.multa,
      p.mal_estado,
      s.nombre as socio_nombre,
      l.titulo as libro_titulo,
      l.autor as libro_autor
    FROM prestamos p
    INNER JOIN socios s ON p.socio_id = s.id
    INNER JOIN libros l ON p.libro_id = l.id
    ORDER BY p.id DESC
  `)
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
  const { mal_estado } = req.body // Espera un booleano
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
    // Calcular multa
    let multa = 0
    const hoy = new Date()
    const fechaDevolucion = new Date(prestamo.fecha_devolucion)
    const devolucionTarde = hoy > fechaDevolucion
    if (devolucionTarde && mal_estado) {
      multa = 7500
    } else if (devolucionTarde) {
      multa = 2500
    } else if (mal_estado) {
      multa = 5000
    }
    await pool.query('UPDATE prestamos SET devuelto=true, multa=$1, mal_estado=$2 WHERE id=$3', [multa, !!mal_estado, id])
    await pool.query('UPDATE libros SET estado=$1 WHERE id=$2', ['disponible', prestamo.libro_id])
    await pool.query('COMMIT')
    res.json({ ok: true, multa })
  } catch (e) {
    await pool.query('ROLLBACK')
    res.status(500).json({ error: e.message })
  }
}

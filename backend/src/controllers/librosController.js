import { pool } from '../db/conexion.js'

export async function listarLibros(req, res) {
  const { rows } = await pool.query('SELECT * FROM libros ORDER BY id DESC')
  res.json(rows)
}


export async function crearLibro(req, res) {
  const { titulo, autor, isbn } = req.body
  if (!titulo || !autor || !isbn) return res.status(400).json({ error: 'Faltan campos' })
  const { rows } = await pool.query(
    'INSERT INTO libros (titulo, autor, isbn, estado) VALUES ($1,$2,$3,$4) RETURNING *',
    [titulo, autor, isbn, 'disponible']
  )
  res.status(201).json(rows[0])
}

export async function eliminarLibro(req, res) {
  const { id } = req.params
  try {
    // Verifica si el libro tiene préstamos NO DEVUELTOS
    const { rows } = await pool.query('SELECT COUNT(*) FROM prestamos WHERE libro_id = $1 AND devuelto = false', [id])
    if (parseInt(rows[0].count) > 0) {
      return res.status(400).json({ error: 'No se puede borrar el libro porque tiene préstamos activos (no devueltos).' })
    }
    await pool.query('DELETE FROM libros WHERE id = $1', [id])
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

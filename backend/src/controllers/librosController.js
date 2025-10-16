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

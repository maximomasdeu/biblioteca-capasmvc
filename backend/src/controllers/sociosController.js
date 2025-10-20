export async function eliminarSocio(req, res) {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM socios WHERE id = $1', [id])
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
import { pool } from '../db/conexion.js'

export async function listarSocios(req, res) {
  const { rows } = await pool.query('SELECT * FROM socios ORDER BY id DESC')
  res.json(rows)
}

export async function crearSocio(req, res) {
  const { nombre, dni } = req.body
  if (!nombre || !dni) return res.status(400).json({ error: 'Faltan campos' })
  const numero_socio = Date.now().toString().slice(-6)
  try {
    const { rows } = await pool.query(
      'INSERT INTO socios (nombre, dni, numero_socio) VALUES ($1,$2,$3) RETURNING *',
      [nombre, dni, numero_socio]
    )
    res.status(201).json(rows[0])
  } catch (e) {
    if (e.code === '23505') {
      return res.status(409).json({ error: 'DNI ya registrado' })
    }
    res.status(500).json({ error: 'Error al crear socio' })
  }
}

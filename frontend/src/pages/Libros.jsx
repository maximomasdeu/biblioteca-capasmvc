import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import Tabla from '../components/Tabla'
import Boton from '../components/Boton'

export default function Libros() {
  const [libros, setLibros] = useState([])
  const [form, setForm] = useState({ titulo: '', autor: '', isbn: '' })

  const cargar = async () => {
    const { data } = await api.get('/libros')
    setLibros(data)
  }
  useEffect(() => { cargar() }, [])

  const crear = async () => {
    if (!form.titulo || !form.autor || !form.isbn) {
      alert('⚠️ Por favor completa todos los campos')
      return
    }
    await api.post('/libros', form)
    setForm({ titulo: '', autor: '', isbn: '' })
    cargar()
  }

  return (
    <div>
      <div style={{
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#2d3748',
          marginBottom: '8px'
        }}>
          📚 Gestión de Libros
        </h2>
        <p style={{ color: '#718096', fontSize: '14px' }}>
          Agrega y administra el catálogo de libros de la biblioteca
        </p>
      </div>

      <div style={{
        background: '#f7fafc',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '2px solid #e2e8f0'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#2d3748',
          marginBottom: '16px'
        }}>
          ➕ Agregar Nuevo Libro
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          <input
            placeholder="Título del libro"
            value={form.titulo}
            onChange={e=>setForm({...form, titulo:e.target.value})}
            style={{ width: '100%' }}
          />
          <input
            placeholder="Autor"
            value={form.autor}
            onChange={e=>setForm({...form, autor:e.target.value})}
            style={{ width: '100%' }}
          />
          <input
            placeholder="ISBN"
            value={form.isbn}
            onChange={e=>setForm({...form, isbn:e.target.value})}
            style={{ width: '100%' }}
          />
          <Boton onClick={crear} style={{ width: '100%' }}>
            ✅ Agregar Libro
          </Boton>
        </div>
      </div>

      <Tabla rows={libros} />
    </div>
  )
}

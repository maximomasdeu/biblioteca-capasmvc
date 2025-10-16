import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import Tabla from '../components/Tabla'
import Boton from '../components/Boton'

export default function Prestamos() {
  const [prestamos, setPrestamos] = useState([])
  const [socios, setSocios] = useState([])
  const [libros, setLibros] = useState([])
  const [form, setForm] = useState({ socio_id: '', libro_id: '', fecha_inicio: '', fecha_devolucion: '' })

  const formatearFecha = (fecha) => {
    if (!fecha) return ''
    const date = new Date(fecha)
    const dia = String(date.getDate()).padStart(2, '0')
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const año = date.getFullYear()
    return `${dia}/${mes}/${año}`
  }

  const cargar = async () => {
    const { data } = await api.get('/prestamos')
    setPrestamos(data)
  }

  const cargarSocios = async () => {
    const { data } = await api.get('/socios')
    setSocios(data)
  }

  const cargarLibros = async () => {
    const { data } = await api.get('/libros')
    setLibros(data.filter(l => l.estado === 'disponible'))
  }

  useEffect(() => { 
    cargar()
    cargarSocios()
    cargarLibros()
  }, [])

  const crear = async () => {
    if (!form.socio_id || !form.libro_id || !form.fecha_inicio || !form.fecha_devolucion) {
      alert('⚠️ Por favor completa todos los campos')
      return
    }
    try {
      await api.post('/prestamos', form)
      setForm({ socio_id: '', libro_id: '', fecha_inicio: '', fecha_devolucion: '' })
      cargar()
      cargarLibros() // Actualiza la lista de libros disponibles
    } catch (e) {
      alert('❌ ' + (e?.response?.data?.error || 'Error al crear préstamo'))
    }
  }

  const devolver = async (id) => {
    if (confirm('¿Confirmar la devolución de este libro?')) {
      try {
        await api.post(`/prestamos/${id}/devolver`)
        cargar()
        cargarLibros() // Actualiza la lista de libros disponibles
      } catch (e) {
        alert('❌ Error al registrar devolución')
      }
    }
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
          📖 Gestión de Préstamos
        </h2>
        <p style={{ color: '#718096', fontSize: '14px' }}>
          Registra préstamos y devoluciones de libros
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
          ➕ Crear Nuevo Préstamo
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px'
        }}>
          <div>
            <label style={{ fontSize: '12px', color: '#718096', display: 'block', marginBottom: '4px' }}>
              Socio
            </label>
            <select
              value={form.socio_id}
              onChange={e=>setForm({...form, socio_id:e.target.value})}
              style={{ 
                width: '100%',
                padding: '10px 14px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">Seleccionar socio</option>
              {socios.map(s => (
                <option key={s.id} value={s.id}>
                  {s.nombre} (DNI: {s.dni})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#718096', display: 'block', marginBottom: '4px' }}>
              Libro
            </label>
            <select
              value={form.libro_id}
              onChange={e=>setForm({...form, libro_id:e.target.value})}
              style={{ 
                width: '100%',
                padding: '10px 14px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">Seleccionar libro</option>
              {libros.map(l => (
                <option key={l.id} value={l.id}>
                  {l.titulo} - {l.autor}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#718096', display: 'block', marginBottom: '4px' }}>
              Fecha de Inicio
            </label>
            <input
              type="date"
              value={form.fecha_inicio}
              onChange={e=>setForm({...form, fecha_inicio:e.target.value})}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#718096', display: 'block', marginBottom: '4px' }}>
              Fecha de Devolución
            </label>
            <input
              type="date"
              value={form.fecha_devolucion}
              onChange={e=>setForm({...form, fecha_devolucion:e.target.value})}
              style={{ width: '100%' }}
            />
          </div>
          <Boton onClick={crear} style={{ width: '100%' }}>
            ✅ Crear Préstamo
          </Boton>
        </div>
      </div>

      <Tabla 
        rows={prestamos.map(p => ({
          id: p.id,
          socio_id: p.socio_id,
          socio_nombre: p.socio_nombre,
          libro_id: p.libro_id,
          libro_titulo: p.libro_titulo,
          libro_autor: p.libro_autor,
          fecha_inicio: formatearFecha(p.fecha_inicio),
          fecha_devolucion: formatearFecha(p.fecha_devolucion),
          estado: p.devuelto ? '✓ Devuelto' : '⏳ Pendiente',
          _original: p // Guardamos el objeto original para acciones
        }))} 
        extraActions={(row)=>(
          !row._original.devuelto ? (
            <Boton 
              onClick={()=>devolver(row._original.id)} 
              variant="secondary"
            >
              ↩️ Devolver
            </Boton>
          ) : (
            <span style={{
              padding: '6px 12px',
              background: '#c6f6d5',
              color: '#22543d',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              ✓ Devuelto
            </span>
          )
        )}
      />
    </div>
  )
}

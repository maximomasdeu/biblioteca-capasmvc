import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import Tabla from '../components/Tabla'
import Boton from '../components/Boton'

export default function Prestamos() {
  const [prestamos, setPrestamos] = useState([])
  const [form, setForm] = useState({ socio_id: '', libro_id: '', fecha_inicio: '', fecha_devolucion: '' })

  const cargar = async () => {
    const { data } = await api.get('/prestamos')
    setPrestamos(data)
  }
  useEffect(() => { cargar() }, [])

  const crear = async () => {
    if (!form.socio_id || !form.libro_id || !form.fecha_inicio || !form.fecha_devolucion) {
      alert('⚠️ Por favor completa todos los campos')
      return
    }
    try {
      await api.post('/prestamos', form)
      setForm({ socio_id: '', libro_id: '', fecha_inicio: '', fecha_devolucion: '' })
      cargar()
    } catch (e) {
      alert('❌ ' + (e?.response?.data?.error || 'Error al crear préstamo'))
    }
  }

  const devolver = async (id) => {
    if (confirm('¿Confirmar la devolución de este libro?')) {
      try {
        await api.post(`/prestamos/${id}/devolver`)
        cargar()
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
          <input
            type="number"
            placeholder="ID del Socio"
            value={form.socio_id}
            onChange={e=>setForm({...form, socio_id:e.target.value})}
            style={{ width: '100%' }}
          />
          <input
            type="number"
            placeholder="ID del Libro"
            value={form.libro_id}
            onChange={e=>setForm({...form, libro_id:e.target.value})}
            style={{ width: '100%' }}
          />
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
        rows={prestamos} 
        extraActions={(row)=>(
          !row.devuelto ? (
            <Boton 
              onClick={()=>devolver(row.id)} 
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

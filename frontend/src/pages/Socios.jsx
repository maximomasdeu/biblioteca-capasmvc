import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import Tabla from '../components/Tabla'
import Boton from '../components/Boton'

export default function Socios() {
  const [socios, setSocios] = useState([])
  const [form, setForm] = useState({ nombre: '', dni: '' })

  const cargar = async () => {
    const { data } = await api.get('/socios')
    setSocios(data)
  }
  useEffect(() => { cargar() }, [])

  const crear = async () => {
    if (!form.nombre || !form.dni) {
      alert('⚠️ Por favor completa todos los campos')
      return
    }
    try {
      await api.post('/socios', form)
      setForm({ nombre: '', dni: '' })
      cargar()
    } catch (e) {
      alert('❌ ' + (e?.response?.data?.error || 'Error al crear socio'))
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
          👥 Gestión de Socios
        </h2>
        <p style={{ color: '#718096', fontSize: '14px' }}>
          Registra y administra los socios de la biblioteca
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
          ➕ Registrar Nuevo Socio
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '12px'
        }}>
          <input
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={e=>setForm({...form, nombre:e.target.value})}
            style={{ width: '100%' }}
          />
          <input
            placeholder="DNI"
            value={form.dni}
            onChange={e=>setForm({...form, dni:e.target.value})}
            style={{ width: '100%' }}
          />
          <Boton onClick={crear} variant="secondary" style={{ width: '100%' }}>
            ✅ Registrar Socio
          </Boton>
        </div>
      </div>

      <Tabla rows={socios} />
    </div>
  )
}

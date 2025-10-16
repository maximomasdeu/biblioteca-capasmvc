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
    try {
      await api.post('/socios', form)
      setForm({ nombre: '', dni: '' })
      cargar()
    } catch (e) {
      alert(e?.response?.data?.error || 'Error')
    }
  }

  return (
    <div>
      <h2>Socios</h2>
      <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <input placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})}/>
        <input placeholder="DNI" value={form.dni} onChange={e=>setForm({...form, dni:e.target.value})}/>
        <Boton onClick={crear}>Crear</Boton>
      </div>
      <Tabla rows={socios} />
    </div>
  )
}

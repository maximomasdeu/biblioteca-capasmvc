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
    try {
      await api.post('/prestamos', form)
      setForm({ socio_id: '', libro_id: '', fecha_inicio: '', fecha_devolucion: '' })
      cargar()
    } catch (e) {
      alert(e?.response?.data?.error || 'Error')
    }
  }

  const devolver = async (id) => {
    await api.post(`/prestamos/${id}/devolver`)
    cargar()
  }

  return (
    <div>
      <h2>Préstamos</h2>
      <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <input placeholder="Socio ID" value={form.socio_id} onChange={e=>setForm({...form, socio_id:e.target.value})}/>
        <input placeholder="Libro ID" value={form.libro_id} onChange={e=>setForm({...form, libro_id:e.target.value})}/>
        <input type="date" placeholder="Inicio" value={form.fecha_inicio} onChange={e=>setForm({...form, fecha_inicio:e.target.value})}/>
        <input type="date" placeholder="Devolución" value={form.fecha_devolucion} onChange={e=>setForm({...form, fecha_devolucion:e.target.value})}/>
        <Boton onClick={crear}>Crear préstamo</Boton>
      </div>
      <Tabla rows={prestamos} extraActions={(row)=>(
        !row.devuelto ? <Boton onClick={()=>devolver(row.id)}>Devolver</Boton> : null
      )}/>
    </div>
  )
}

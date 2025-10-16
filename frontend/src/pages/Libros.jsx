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
    await api.post('/libros', form)
    setForm({ titulo: '', autor: '', isbn: '' })
    cargar()
  }

  return (
    <div>
      <h2>Libros</h2>
      <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
        <input placeholder="Título" value={form.titulo} onChange={e=>setForm({...form, titulo:e.target.value})}/>
        <input placeholder="Autor" value={form.autor} onChange={e=>setForm({...form, autor:e.target.value})}/>
        <input placeholder="ISBN" value={form.isbn} onChange={e=>setForm({...form, isbn:e.target.value})}/>
        <Boton onClick={crear}>Crear</Boton>
      </div>
      <Tabla rows={libros} />
    </div>
  )
}

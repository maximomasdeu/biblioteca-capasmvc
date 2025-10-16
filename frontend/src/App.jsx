import React, { useEffect, useState } from 'react'
import { api } from './services/api'
import Libros from './pages/Libros'
import Socios from './pages/Socios'
import Prestamos from './pages/Prestamos'

export default function App() {
  const [tab, setTab] = useState('libros')
  return (
    <div style={{ fontFamily: 'system-ui', margin: 24 }}>
      <h1>Biblioteca</h1>
      <nav style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setTab('libros')}>Libros</button>
        <button onClick={() => setTab('socios')}>Socios</button>
        <button onClick={() => setTab('prestamos')}>Préstamos</button>
      </nav>
      {tab === 'libros' && <Libros />}
      {tab === 'socios' && <Socios />}
      {tab === 'prestamos' && <Prestamos />}
    </div>
  )
}

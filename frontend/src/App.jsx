import React, { useState } from 'react'
import Libros from './pages/Libros'
import Socios from './pages/Socios'
import Prestamos from './pages/Prestamos'

export default function App() {
  const [tab, setTab] = useState('libros')
  
  const tabs = [
    { id: 'libros', label: '📚 Libros', icon: '📚' },
    { id: 'socios', label: '👥 Socios', icon: '👥' },
    { id: 'prestamos', label: '📖 Préstamos', icon: '📖' }
  ]

  return (
    <div style={{ 
      minHeight: '100vh',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '32px',
          textAlign: 'center'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: '700',
            margin: 0,
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            📚 Sistema de Biblioteca
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            marginTop: '8px',
            fontSize: '1.1rem'
          }}>
            Gestión completa de libros, socios y préstamos
          </p>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          gap: '0',
          background: '#f7fafc',
          borderBottom: '2px solid #e2e8f0',
          padding: '0 24px'
        }}>
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                padding: '16px 32px',
                border: 'none',
                background: tab === id ? 'white' : 'transparent',
                color: tab === id ? '#667eea' : '#718096',
                fontWeight: tab === id ? '600' : '500',
                fontSize: '16px',
                cursor: 'pointer',
                borderBottom: tab === id ? '3px solid #667eea' : '3px solid transparent',
                transition: 'all 0.3s ease',
                position: 'relative',
                top: '2px'
              }}
              onMouseEnter={(e) => {
                if (tab !== id) {
                  e.target.style.background = '#edf2f7'
                  e.target.style.color = '#4a5568'
                }
              }}
              onMouseLeave={(e) => {
                if (tab !== id) {
                  e.target.style.background = 'transparent'
                  e.target.style.color = '#718096'
                }
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {tab === 'libros' && <Libros />}
          {tab === 'socios' && <Socios />}
          {tab === 'prestamos' && <Prestamos />}
        </div>
      </div>
    </div>
  )
}

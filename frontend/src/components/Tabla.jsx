import React from 'react'

export default function Tabla({ rows = [], extraActions }) {
  if (!rows.length) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        background: '#f7fafc',
        borderRadius: '12px',
        color: '#718096',
        fontSize: '16px'
      }}>
        📭 No hay datos para mostrar
      </div>
    )
  }
  
  const headers = Object.keys(rows[0])
  
  const formatHeader = (header) => {
    return header
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  return (
    <div style={{ 
      overflowX: 'auto',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
    }}>
      <table style={{ 
        width: '100%',
        borderCollapse: 'collapse',
        background: 'white'
      }}>
        <thead>
          <tr style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}>
            {headers.map(h => (
              <th key={h} style={{
                padding: '16px',
                textAlign: 'left',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {formatHeader(h)}
              </th>
            ))}
            {extraActions && (
              <th style={{
                padding: '16px',
                textAlign: 'left',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr 
              key={r.id}
              style={{
                background: idx % 2 === 0 ? 'white' : '#f7fafc',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#edf2f7'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = idx % 2 === 0 ? 'white' : '#f7fafc'
              }}
            >
              {headers.map(h => (
                <td key={h} style={{
                  padding: '14px 16px',
                  color: '#2d3748',
                  fontSize: '14px',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  {String(r[h])}
                </td>
              ))}
              {extraActions && (
                <td style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  {extraActions(r)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

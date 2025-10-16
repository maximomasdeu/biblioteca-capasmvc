import React from 'react'

export default function Tabla({ rows = [], extraActions }) {
  if (!rows.length) return <p>Sin datos</p>
  const headers = Object.keys(rows[0])
  return (
    <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {headers.map(h => <th key={h}>{h}</th>)}
          {extraActions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.id}>
            {headers.map(h => <td key={h}>{String(r[h])}</td>)}
            {extraActions && <td>{extraActions(r)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

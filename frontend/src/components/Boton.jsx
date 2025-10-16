import React from 'react'
export default function Boton({ children, ...props }) {
  return <button {...props} style={{ padding: '6px 10px', cursor: 'pointer' }}>{children}</button>
}

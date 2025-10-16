import React from 'react'

export default function Boton({ children, variant = 'primary', ...props }) {
  const styles = {
    primary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
    },
    secondary: {
      background: '#48bb78',
      color: 'white',
      border: 'none',
    },
    danger: {
      background: '#f56565',
      color: 'white',
      border: 'none',
    }
  }

  return (
    <button
      {...props}
      style={{
        ...styles[variant],
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        ...props.style
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)'
        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)'
        e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      {children}
    </button>
  )
}

import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Logout() {
  let history = useHistory()

  const handleConnect = e => {
    e.preventDefault()
    localStorage.removeItem('adminUser')
    history.push('/admin/login/')
  }

  return (
    <button
      onClick={handleConnect}
      style={{
        display: 'block',
        width: '76px',
        margin: '2rem auto'
      }}
    >
      Logout
    </button>
  )
}

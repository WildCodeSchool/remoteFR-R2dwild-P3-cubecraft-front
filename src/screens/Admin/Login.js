import React, { useState,useEffect } from 'react'
import { useHistory, history } from 'react-router-dom'
import axios from 'axios'
export default function Connexion() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState()

  let history = useHistory()
  const handleConnect = e => {
    e.preventDefault()
    axios
      .post('http://localhost:4242/signin', {
        username: username,
        password: password
      })
      .then(res => {
        history.push('/admin/slider')
        localStorage.setItem('adminUser', res.headers['x-access-token'])
        window.location.reload(true)
      })
      .catch(err => setAlert('Mauvais identifiant ou mot de passe'))
  }

  useEffect(async () => {
    const token = localStorage.getItem('adminUser')
    axios({
      method: 'POST',
      url: 'http://localhost:4242/signin/protected',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.data.mess === 'Authorized') {
        history.push('/admin/slider')
      }
     
    })
  }, [])

  return (
    <div id='admin'>
      <h1>Connectez-vous</h1>
      <form onSubmit={handleConnect} className='Form-Connexion'>
        <div className='Form-group-connexion'>
          <label
            htmlFor='username'
            style={{
              width: '100px',
              display: 'inline-block',
              marginTop: '30px'
            }}
          >
            Pseudo :
          </label>
          <input
            type='text'
            name='username'
            onChange={e => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>
        <div className='Form-group-connexion'>
          <label
            htmlFor='password'
            style={{
              width: '100px',
              display: 'inline-block',
              marginTop: '30px'
            }}
          >
            Mot de passe :
          </label>
          <input
            type='password'
            name='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <button
          type='submit'
          style={{
            width: '100px',
            display: 'block',
            marginLeft: '100px',
            marginTop: '25px'
          }}
        >
          Validez
        </button>
        <p>{alert}</p>
      </form>
    </div>
  )
}

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function AdminPhotosAdd() {
  const history = useHistory()
  const comeBack = () => {
    history.goBack()
  }

  const [valid, setValid] = useState(false)
  const [addOk, setAddOk] = useState('')
  const [file, setFile] = useState({
    data: '',
    name: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('adminUser')
    axios({
      method: 'POST',
      url: 'http://localhost:4242/signin/protected',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.data.mess !== 'Authorized') {
        history.push('/admin/login')
      }
    })
  }, [])


  const invisible = () => {
    setAddOk('')
  }

  const handleSubmit = () => {
    axios
      .post('http://localhost:4242/photos', {
        Name: `/images/${file.name}`
      })
      .then(res => {
        setAddOk('Image ajoutée')
        setTimeout(invisible, 1500)
      })
    const data = new FormData()
    data.append('name', file.name)
    data.append('file', file.data)
    axios
      .post('http://localhost:4242/upload', data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <section className='AddPage' id='admin'>
      <div className='Container-Addpage'>
        <h1>Photos: Ajouter une image</h1>
        <div className='formulaire-admin-add'>
          <div className='form-group-add'>
            <label htmlFor='file'>Choisissez une image :</label>
            <input
              type='file'
              id='file'
              accept='image/png, image/jpeg'
              onChange={e =>
                setFile({
                  data: e.target.files[0],
                  name: e.target.files[0].name.replace(/ /g, '')
                })
              }
            />
          </div>
        </div>
        <div className='block-select-img'>
          <p>{file.name}</p>
        </div>
        <div className='Form-group-btn'>
          <button onClick={comeBack}>Retour</button>
          <button
            onClick={handleSubmit}
            style={{ display: `${valid ? 'none' : 'block'}` }}
          >
            Sauvegarder
          </button>
          {addOk ? <p className='updateTitle'>{addOk}</p> : ''}
        </div>
      </div>
    </section>
  )
}

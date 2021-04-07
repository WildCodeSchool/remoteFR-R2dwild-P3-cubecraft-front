import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function AdminNewsModified(props) {
  const [newsAdded, setNewsAdded] = useState(false)
  const [status, setStatus] = useState(null)
  const [datas, setDatas] = useState([''])
  const [display, setDisplay] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    text: '',
    photo_id: 1
  })
  const params = props.match.params
  const id = params.id

  function displayPhotos() {
    const fetchPhoto = async () => {
      const resq = await axios.get('http://localhost:4242/photos')
      setDatas(resq.data)
      setDisplay(!display)
    }
    fetchPhoto()
  }
  const addId = id => {
    setFormData({ photo_id: id })
    setDisplay(!display)
  }

  useEffect(() => {
    const fetchData = async () => {
      const resq = await axios
        .get(`http://localhost:4242/news/${id}`)
        .then(function (response) {
          if (response.status === 200) {
            setStatus(200)
            setFormData({
              title: response.data.Title,
              link: response.data.Link,
              text: response.data.Text,
              photo_id: response.data.Photo_id
            })
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
            if (error.response.status === 404) {
              setStatus(404)
              setNewsAdded(false)
            }
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
    }
    fetchData()
  }, [])

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const editNews = async () => {
    const res = await axios
      .put(`http://localhost:4242/news/${id}`, {
        ...formData
      })
      .then(function (response) {
        setNewsAdded(true)
        setStatus(null)
        setFormData({
          title: '',
          link: '',
          text: '',
          photo_id: 1
        })
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
          if (error.response.status === 422) {
            setStatus(`ID photo incorrect`)
            setNewsAdded(false)
          }
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  }
  return status === 404 ? (
    <div>
      <h1>404 Aucune actualité ne correspond à cette URL</h1>
      <br />
      <Link to='/admin/actualites/'>Retourner aux actus</Link>
    </div>
  ) : (
    <section className='AddPage'>
      <div className='Container-Addpage'>
        <h2>Modifier une actualitée</h2>
        <div className='formulaire-admin-add'>
          <div className='form-group-add'>
            <label htmlFor='title'>Titre</label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group-add'>
            <label htmlFor='link'>Lien</label>
            <input
              type='text'
              name='link'
              value={formData.link}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group-add'>
            <label htmlFor='text'>Texte</label>
            <textarea
              type='text'
              name='text'
              value={formData.text}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group-add'>
            <label>Choix de la photo</label>
            <input type='number' name='picture' value={formData.photo_id} />
            <button className='choice-picture' onClick={displayPhotos}>
              Choisir
            </button>
          </div>
          <div
            className='container-choice-img'
            style={{ display: `${display ? 'none' : 'flex'}` }}
          >
            {datas.map((data, index) => (
              <div className='choicephoto-container'>
                <img className='img-upload' key={index} src={`${data.Name}`} />
                <button onClick={() => addId(data.Id)}>Choisir</button>
              </div>
            ))}
          </div>
          <div className='Form-group-btn'>
            <button onClick={editNews}>Modifier la news</button>
            {newsAdded ? (
              <div className='popupMessage'>
                <p>Actu modifiée !</p>
                <Link className='Backlink' to='/admin/actualites/'>
                  Retourner aux actus
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

AdminNewsModified.propTypes = {
  match: PropTypes.object
}

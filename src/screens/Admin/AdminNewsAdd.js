import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link ,useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import ApiKey from './Apikey'

export default function AdminNewsAdd() {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    text: '',
    photo_id: ''
  })
  const [datas, setDatas] = useState([''])
  const [display, setDisplay] = useState(true)
  const [newsAdded, setNewsAdded] = useState(false)
  const [status, setStatus] = useState(null)
  const [test, setTest] = useState('')
  const history = useHistory()
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


  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleEditorChange = (content, editor) => {
    setFormData({ ...formData, text: content })
  }

  function displayPhotos() {
    const fetchData = async () => {
      const resq = await axios.get('http://localhost:4242/photos')
      setDatas(resq.data)
      setDisplay(!display)
    }
    fetchData()
  }
  const addId = id => {
    setFormData({ ...formData, photo_id: id })
    setDisplay(!display)
  }

  const addNews = async () => {
    await axios
      .post('http://localhost:4242/news/', {
        ...formData
      })
      .then(function (response) {
        if (response.status === 200) {
          setNewsAdded(true)
          setStatus()
          setFormData({
            title: '',
            link: '',
            text: '',
            photo_id: ''
          })
        }
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

  return (
    <section className='AddPage' id='admin'>
      <div className='Container-Addpage'>
        <h2>Ajouter une actualité</h2>
        <div className='form-group-add'>
          <label htmlFor='title'>Titre :</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group-add'>
          <label htmlFor='link'>Lien :</label>
          <input
            type='text'
            name='link'
            value={formData.link}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group-add'>
          <label htmlFor='text'>Texte :</label>
          <Editor
            apiKey={ApiKey}
            name='text'
            onEditorChange={handleEditorChange}
            init={{
              height: 500,
              menubar: false,
              quickbars_image_toolbar:
                'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
              plugins: [
                'advlist autolink lists link image',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'a_tinymce_plugin',
                'insertdatetime media table paste wordcount'
              ],
              toolbar:
                'undo redo | formatselect | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | help'
            }}
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
          <button onClick={addNews}>Ajouter la news</button>
          {newsAdded ? (
            <div className='popupMessage'>
              <p> Actu ajoutée !</p>
              <Link className='Backlink' to='/admin/actualites/'>
                Retourner aux actus
              </Link>
            </div>
          ) : (
            ''
          )}
          {status}
        </div>
      </div>
    </section>
  )
}

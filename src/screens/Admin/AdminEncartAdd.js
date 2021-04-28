import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import ApiKey from './Apikey'

export default function AdminEncartAdd() {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [textConcept, setTextConcept] = useState('')
  const [picture, setPicture] = useState('')
  const [valid, setValid] = useState(false)
  const [datas, setDatas] = useState([''])
  const [display, setDisplay] = useState(true)

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

  function displayPhotos() {
    const fetchData = async () => {
      const resq = await axios.get('http://localhost:4242/photos')
      setDatas(resq.data)
      setDisplay(!display)
    }
    fetchData()
  }

  const addId = id => {
    setPicture(id)
    setDisplay(!display)
  }

  const addEncart = () =>
    axios
      .post('http://localhost:4242/encart', {
        Text: textConcept,
        Title: title,
        Photo_id: picture
      })
      .then(res => {
        setValid(!valid)
        setTitle(title)
        setTextConcept(textConcept)
        setPicture(picture)
      })
  function comeBack() {
    history.push('/admin/encart')
  }

  const handleEditorChange = (content, editor) => {
    setTextConcept(content)
  }
  console.log(textConcept)
  return (
    <section className='AddPage' id='admin'>
      <div className='Container-Addpage'>
        <h1>Encart: Ajouter un encart </h1>
        <div className='formulaire-admin-add'>
          <div className='form-group-add'>
            <label htmlFor='title'>Titre de l'encart :</label>
            <input
              type='text'
              name='title'
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </div>
          <div className='form-group-add'>
            <label htmlFor='concept'>Encart :</label>
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
            <input type='number' name='picture' value={picture} />
            <button className='choice-picture' onClick={displayPhotos}>
              Choisir
            </button>
          </div>
          <div
            className='container-choice-img'
            style={{ display: `${display ? 'none' : 'flex'}` }}
          >
            {datas.map((data, index) => (
              <>
                <div className='choicephoto-container'>
                  <img
                    className='img-upload'
                    key={index}
                    src={`${data.Name}`}
                  />
                  <button onClick={() => addId(data.Id)}>Choisir</button>
                </div>
              </>
            ))}
          </div>
          <div className='Form-group-btn'>
            <button onClick={comeBack}>Retour</button>
            {valid ? 'Un nouveau encart à été ajouté' : ''}
            <button
              onClick={addEncart}
              style={{ display: `${valid ? 'none' : 'block'}` }}
            >
              Ajouter un encart
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

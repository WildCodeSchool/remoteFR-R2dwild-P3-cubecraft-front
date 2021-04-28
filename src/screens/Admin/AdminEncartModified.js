import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import ApiKey from './Apikey'

export default function AdminEncartModified() {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [textConcept, setTextConcept] = useState('')

  const [textConceptSd, setTextConceptSd] = useState('')
  const [picture, setPicture] = useState('')
  const [pictureId, setPictureId] = useState('')

  const [valid, setValid] = useState(false)
  const [datas, setDatas] = useState([])
  const [infos, setInfos] = useState([])
  const [display, setDisplay] = useState(true)

  function displayPhotos() {
    const fetchPhoto = async () => {
      const resq = await axios.get('http://localhost:4242/photos')
      setInfos(resq.data)
      setDisplay(!display)
    }
    fetchPhoto()
  }

  console.log(textConcept)
  let { id } = useParams()

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
      const fetchData = async () => {
        const resq = await axios.get(`http://localhost:4242/encart/${id}`)
        setDatas(resq.data)
        setTitle(resq.data[0].Title)
        setTextConcept(resq.data[0].Text)
        setPicture(resq.data[0].Name)
        setPictureId(resq.data[0].Photo_Id)
    }
    fetchData()
    })
  }, [])

  const addId = (id, name) => {
    setPicture(name)
    setPictureId(id)
    setDisplay(!display)
  }

  const modified = () => {
    axios
      .put(`http://localhost:4242/encart/${id}`, {
        Text: textConceptSd,
        Title: title,
        Photo_id: pictureId
      })
      .then(res => {
        setValid(!valid)
        setTitle(title)
        setTextConcept(textConcept)
        setPictureId(pictureId)
      })
  }
  function comeBack() {
    history.goBack()
  }

  const handleEditorChange = (content, editor) => {
    setTextConceptSd(content)
  }

  return (
    <section className='AddPage' id='admin'>
      <div className='Container-Addpage'>
        <h1>Encart: Modifier un encart </h1>
        <div className='formulaire-admin-add'>
          {datas.map(data => (
            <>
              <div className='form-group-add'>
                <label>Titre de l'encart</label>
                <input
                  type='text'
                  name='title'
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                />
              </div>
              <div className='form-group-add'>
                <label>Encart</label>
                <Editor
                  apiKey={ApiKey}
                  name='text'
                  onEditorChange={handleEditorChange}
                  initialValue={textConcept}
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
                {/* <input type='number' name='picture' value={picture} /> */}
                <button className='choice-picture' onClick={displayPhotos}>
                  Choisir
                </button>
                <img src={picture} alt='' width='200px' />
              </div>
              <div
                className='container-choice-img'
                style={{ display: `${display ? 'none' : 'flex'}` }}
              >
                {infos.map((info, index) => (
                  <>
                    <div className='choicephoto-container'>
                      <img
                        className='img-upload'
                        key={index}
                        src={`${info.Name}`}
                      />
                      <button onClick={() => addId(info.Id, info.Name)}>
                        Choisir
                      </button>
                    </div>
                  </>
                ))}
              </div>
            </>
          ))}
          <div className='Form-group-btn'>
            <button
              onClick={modified}
              style={{ display: `${valid ? 'none' : 'block'}` }}
            >
              Valider modification
            </button>
            {valid ? "L'encart à été modifié" : ''}
            <button onClick={comeBack}>Retour</button>
          </div>
        </div>
      </div>
    </section>
  )
}

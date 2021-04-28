import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import ApiKey from './Apikey'

export default function AdminAboutUsAdd() {
  const history = useHistory()
  const comeBack = () => {
    history.goBack()
  }

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [jobName, setJobName] = useState('')
  const [description, setDescription] = useState('')
  const [picture, setPicture] = useState('')
  const [valid, setValid] = useState(false)
  const [datas, setDatas] = useState([''])
  const [display, setDisplay] = useState(true)
  const [initialValue, setInitialValue] = useState('')

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
  const handleEditorChange = (content, editor) => {
    setDescription(content)
  }
  const AddProfile = () => {
    axios
      .post('http://localhost:4242/about', {
        FirstName: firstName,
        LastName: lastName,
        JobName: jobName,
        Description: description,
        Photo_id: picture
      })
      .then(res => {
        setValid(!valid)
        setFirstName(firstName)
        setLastName(lastName)
        setJobName(jobName)
        setDescription(description)
        setPicture(picture)
      })
  }

  return (
    <section className='AddPage' id='admin'>
      <div className='Container-Addpage'>
        <h1>A propos: Ajouter un collaborateur</h1>

        <div className='formulaire-admin-add'>
          <div className='form-group-add'>
            <label htmlFor='title'>Prénom :</label>
            <input
              type='text'
              name='title'
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />
          </div>
          <div className='form-group-add'>
            <label htmlFor='title'>Nom :</label>
            <input
              type='text'
              name='lastname'
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />
          </div>
          <div className='form-group-add'>
            <label htmlFor='picture'>Poste : </label>
            <input
              type='text'
              name='jobname'
              value={jobName}
              onChange={event => setJobName(event.target.value)}
            />
          </div>
          <div className='form-group-add'>
            <label htmlFor='picture'>Description : </label>
            <Editor
              initialValue={initialValue}
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
            <label>Choix de la photos</label>
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
              <div className='choicephoto-container'>
                <img className='img-upload' key={index} src={`${data.Name}`} />
                <button onClick={() => addId(data.Id)}>Choisir</button>
              </div>
            ))}
          </div>
          <div className='Form-group-btn'>
            <button onClick={comeBack}>Retour</button>
            {valid ? 'Un nouveau collaborateur à été ajouté' : ''}
            <button
              onClick={AddProfile}
              style={{ display: `${valid ? 'none' : 'block'}` }}
            >
              Ajouter collaborateur
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

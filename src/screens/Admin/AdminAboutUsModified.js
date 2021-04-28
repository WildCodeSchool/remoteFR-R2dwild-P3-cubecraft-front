import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import ApiKey from './Apikey'

export default function AdminAboutUsModified() {
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
  const [datas, setDatas] = useState([])
  const [display, setDisplay] = useState(true)
  const [infos, setInfos] = useState([])
  const [initialValue, setInitialValue] = useState('')

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
        const resq = await axios.get(`http://localhost:4242/about/${id}`)
        setDatas(resq.data)
        setFirstName(resq.data[0].FirstName)
        setLastName(resq.data[0].LastName)
        setJobName(resq.data[0].JobName)
        setDescription(resq.data[0].Description)
        setPicture(resq.data[0].Photo_id)
      }
      fetchData()
    })
  }, [])

  function displayPhotos() {
    const fetchPhoto = async () => {
      const resq = await axios.get('http://localhost:4242/photos')
      setInfos(resq.data)
      setDisplay(!display)
      setFirstName(firstName)
      setLastName(lastName)
      setJobName(jobName)
      setDescription(description)
      setPicture(picture)
    }
    fetchPhoto()
  }

  const addId = id => {
    setPicture(id)
    setDisplay(!display)
  }

  const handleEditorChange = (content, editor) => {
    setDescription(content)
  }

  const modified = () => {
    axios
      .put(`http://localhost:4242/about/${id}`, {
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
        <h1>A propos: Modifier un profil</h1>

        <div className='formulaire-admin-add'>
          {datas.map(data => (
            <>
              <div className='form-group-add'>
                <label>Prénom :</label>
                <input
                  type='text'
                  name='firstname'
                  value={firstName}
                  onChange={event => setFirstName(event.target.value)}
                />
              </div>
              <div className='form-group-add'>
                <label>Nom :</label>
                <input
                  type='text'
                  name='lastname'
                  value={lastName}
                  onChange={event => setLastName(event.target.value)}
                />
              </div>
              <div className='form-group-add'>
                <label>Poste :</label>
                <input
                  type='text'
                  name='jobname'
                  value={jobName}
                  onChange={event => setJobName(event.target.value)}
                />
              </div>
              <div className='form-group-add'>
                <label>Description :</label>
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
                {infos.map((info, index) => (
                  <>
                    <div className='choicephoto-container'>
                      <img
                        className='img-upload'
                        key={index}
                        src={`${info.Name}`}
                      />
                      <button onClick={() => addId(info.Id)}>Choisir</button>
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
            {valid ? 'Le collaborateur à été modifié' : ''}
            <button onClick={comeBack}>Retour</button>
          </div>
        </div>
      </div>
    </section>
  )
}

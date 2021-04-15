import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Editor } from '@tinymce/tinymce-react'
import ApiKey from './Api-key'

export default function AdminProModified(props) {
  const [productAdded, setProductAdded] = useState(false)
  const [status, setStatus] = useState(null)
  const [datas, setDatas] = useState([''])
  const [display, setDisplay] = useState(true)
  const [formData, setFormData] = useState({
    CategoryName: '',
    Price: 0,
    Description: '',
    Individual: 0,
    photo_id: 1
  })
  const [initialValue, setInitialValue] = useState('')

  const handleEditorChange = (content, editor) => {
    setFormData({ ...formData, Description: content })
  }
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
  const params = props.match.params
  const id = params.id
  useEffect(() => {
    const fetchData = async () => {
      const resq = await axios
        .get(`http://localhost:4242/particularPro/${id}`)
        .then(function (response) {
          if (response.status === 200) {
            setStatus(200)
            setFormData({
              CategoryName: response.data.CategoryName,
              Price: response.data.Price,
              Description: response.data.Description,
              Individual: 0,
              photo_id: response.data.Photo_id
            })
            setInitialValue(response.data.Description)
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
            if (error.response.status === 404) {
              setStatus(404)
              setProductAdded(false)
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

  const editProduct = async () => {
    const res = await axios
      .put(`http://localhost:4242/particularPro/${id}`, {
        ...formData
      })
      .then(function (response) {
        if (response.status === 200) {
          setProductAdded(true)
          setStatus(null)
        }
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
          if (error.response.status === 422) {
            setStatus(`ID photo incorrect`)
            setProductAdded(false)
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
      <h1>404 Aucun produit ne correspond à cette URL</h1>
      <br />
      <Link to='/admin/professionnel/'>
        Retourner aux produits pour professionnels
      </Link>
    </div>
  ) : (
    <section className='AddPage' id='admin'>
      <div className='Container-Addpage'>
        <h1>Professionnel : Modifier un article</h1>

        <div className='formulaire-admin-add'>
          <div className='form-group-add'>
            <label htmlFor='CategoryName'>Nom</label>
            <input
              type='text'
              name='CategoryName'
              value={formData.CategoryName}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group-add'>
            <label htmlFor='Price'>Prix</label>
            <input
              type='number'
              name='Price'
              value={formData.Price}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group-add'>
            <label htmlFor='Description'>Description</label>
            <Editor
              initialValue={initialValue}
              apiKey={ApiKey}
              name='Description'
              onEditorChange={handleEditorChange}
              init={{
                height: 500,
                menubar: true,
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
            <button onClick={editProduct}>Modifier le produit</button>

            {productAdded ? (
              <div className='popupMessage'>
                <p>Produit modifié !</p>
                <Link className='Backlink' to='/admin/professionnel/'>
                  Retourner aux produits pour professionnel
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

AdminProModified.propTypes = {
  match: PropTypes.object
}

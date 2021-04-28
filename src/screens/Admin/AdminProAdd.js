import axios from 'axios'
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import ApiKey from './Apikey'
import { useHistory } from 'react-router-dom'
export default function AdminProAdd() {
  const [formData, setFormData] = useState({
    CategoryName: '',
    Price: 0,
    Description: '',
    Individual: 0,
    photo_id: ''
  })
  const [datas, setDatas] = useState([''])
  const [display, setDisplay] = useState(true)
  const [productAdded, setProductAdded] = useState(false)
  const [status, setStatus] = useState(null)

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleEditorChange = (content, editor) => {
    setFormData({ ...formData, Description: content })
  }
  let history = useHistory()
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
    setFormData({ ...formData, photo_id: id })
    setDisplay(!display)
  }

  const addProduct = async () => {
    const res = await axios
      .post('http://localhost:4242/particularPro', {
        ...formData
      })
      .then(function (response) {
        if (response.status === 200) {
          setProductAdded(true)
          setStatus()
          setFormData({
            CategoryName: '',
            Price: 0,
            Description: '',
            Individual: 0,
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

  return (
    <section className='AddPage' id='admin'>
      <div className='Container-Addpage'>
        <h1>Professionnel : Ajouter un article</h1>

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
            <button onClick={addProduct}>Ajouter le produit</button>
            {productAdded ? (
              <div className='popupMessage'>
                <p>Produit ajouté !</p>
                <Link className='Backlink' to='/admin/professionnel/'>
                  Retourner aux produits pour professionnels
                </Link>
              </div>
            ) : (
              ''
            )}
            {status}
          </div>
        </div>
      </div>
    </section>
  )
}

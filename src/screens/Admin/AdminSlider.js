import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import DelOrPutSlider from '../../components/Admin/DelOrPutSlider'
import EspacePro from '../../components/Admin/EspacePro'
import EspaceParticulier from '../../components/Admin/EspaceParticulier'
import TitreHomepage from '../../components/Admin/TitreHomepage'
import AdminEncart from './AdminEncart'

export default function AdminSlider() {
  const [datas, setDatas] = useState([''])
  const [title, setTitle] = useState('')
  const [inputVisible, setInputvisible] = useState(false)
  const [newWord, setNewWord] = useState('')
  const [textModified, setTextModified] = useState('')
  const [display, setDisplay] = useState(true)
  const [picture, setPicture] = useState('')
  const [namePicture, setNamePicture] = useState('')
  const [infos, setInfos] = useState([''])
  const [updatedOk, setUpdatedOk] = useState('')
  const [updatedImgOk, setUpdatedImgOk] = useState('')
  const [addWord, setAddWord] = useState('')

  let history = useHistory()

  function displayPhotos() {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:4242/photos')
      setInfos(res.data)
      setDisplay(!display)
    }
    fetchData()
  }

  useEffect(() => {
    const fetchData = async () => {
      const resq = await axios.get(`http://localhost:4242/slider`)
      setDatas(resq.data)
      const res = await axios.get('http://localhost:4242/slider/title')
      setTitle(res.data[0].Titre)
      setNamePicture(res.data[0].Name)
    }
    fetchData()
  }, [])

  useEffect(async () => {
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
      const changeImg = () => {
        setNamePicture(namePicture)
      }
      changeImg()
    })
  }, [namePicture, inputVisible, display])

  const invisible = () => {
    setUpdatedOk('')
    setUpdatedImgOk('')
    setAddWord('')
    setNewWord('')
  }

  const addId = (id, name) => {
    setPicture(id)
    setNamePicture(name)
    setDisplay(!display)
  }
  const deleteSlider = id => {
    axios.delete(`http://localhost:4242/slider/${id}`, {}).then(res => {
      setInputvisible(!inputVisible)
    })
  }
  function AddSlider() {
    if (newWord.length === 0) {
      setAddWord('Champs vide')
    } else {
      axios
        .post('http://localhost:4242/slider', {
          Word: newWord
        })
        .then(res => {
          setInputvisible(!inputVisible)
          setAddWord('Un nouveau mot a été ajouté')
          setTimeout(invisible, 1500)
        })
    }
  }
  const updateInfos = async () => {
    if (title.length === 0) {
      setUpdatedOk('Champs vide')
    } else {
      const res = await axios
        .put(`http://localhost:4242/slider/title/1`, {
          Titre: title
        })
        .then(res => {
          setUpdatedOk('Titre mis à jour')
          setTimeout(invisible, 1500)
        })
    }
  }

  const updateBackground = async () => {
    if (picture.length === 0) {
      setUpdatedImgOk('Champs vide')
    } else {
      const res = await axios
        .put(`http://localhost:4242/slider/title/1`, {
          Photo_id: picture
        })
        .then(res => {
          setUpdatedImgOk('Image de fond mis à jour')
          setTimeout(invisible, 1500)
        })
    }
  }

  return (
    <section id='admin'>
      <h1>Page d'accueil</h1>

      <div>
        <h3>Intro slider :</h3>
        <div className='form-group'>
          <input
            value={title}
            type='text'
            onChange={e => setTitle(e.target.value)}
          />
          <button onClick={updateInfos} className='BtnAction'>
            <img
              alt='logo edit'
              className='logoBtn'
              src='/images/logo/save.svg'
            />
          </button>
          {updatedOk === 'Champs vide' ? (
            <p className='updateTitleWarning'>{updatedOk}</p>
          ) : (
            <p className='updateTitle'>{updatedOk}</p>
          )}
        </div>
      </div>
      <div>
        <h3>Changer l'image de fond : </h3>
        <div className='form-group'>
          {/* <input type='text' name='picture' value={namePicture} /> */}
          <img
            className='img-upload'
            src={`${namePicture}`}
            style={{
              width: '250px'
            }}
          />
          <button className='choice-picture' onClick={displayPhotos}>
            Choisir
          </button>
          <button onClick={updateBackground} className='BtnAction'>
            <img
              alt='logo edit'
              className='logoBtn'
              src='/images/logo/save.svg'
            />
          </button>
          {updatedImgOk === 'Champs vide' ? (
            <p className='updateTitleWarning'>{updatedImgOk}</p>
          ) : (
            <p className='updateTitle'>{updatedImgOk}</p>
          )}
        </div>
        <div className='addTitleSlider'>
          <h3>Ajouter un nouveau mot :</h3>
          <div className='form-group'>
            <input
              type='text'
              value={newWord}
              onChange={e => setNewWord(e.target.value)}
            />
            <button className='BtnAction' onClick={AddSlider}>
              <img
                alt='logo add'
                className='logoBtn'
                src='/images/logo/add.svg'
              />
            </button>
            {addWord === 'Champs vide' ? (
              <p className='updateTitleWarning'>{addWord}</p>
            ) : (
              <p className='updateTitle'>{addWord}</p>
            )}
          </div>
        </div>

        <div
          className='container-choice-img'
          style={{ display: `${display ? 'none' : 'flex'}` }}
        >
          {infos.map((info, index) => (
            <>
              <div className='choicephoto-container'>
                <img className='img-upload' key={index} src={`${info.Name}`} />
                <button onClick={() => addId(info.Id, info.Name)}>
                  Choisir
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className=''>
        <div
          className='container-choice-img'
          style={{ display: `${display ? 'none' : 'flex'}` }}
        >
          {infos.map((info, index) => (
            <>
              <div className='choicephoto-container'>
                <img className='img-upload' key={index} src={`${info.Name}`} />
                <button onClick={() => addId(info.Id, info.Name)}>
                  Choisir
                </button>
              </div>
            </>
          ))}
        </div>
      </div>

      <div>
        <h3>Slider :</h3>
        <div style={{ display: `${display ? 'block' : 'none'}` }}>
          {datas.map((data, index) => (
            <DelOrPutSlider
              key={index}
              id={data.Id}
              idUpdate={data.Id}
              text={data.Word} // Condition ternaire ?
              setWord={e => setTextModified(e.target.value)}
              handleClickSupp={() => deleteSlider(data.Id)}
            ></DelOrPutSlider>
          ))}
          <div className='concept-block'>
            <TitreHomepage></TitreHomepage>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <EspacePro />
          <EspaceParticulier />
        </div>
        <AdminEncart />
      </div>
    </section>
  )
}

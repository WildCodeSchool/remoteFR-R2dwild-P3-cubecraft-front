import axios from 'axios'
import { useState, useEffect } from 'react'

export default function EspacePro() {
  const [title, setTitle] = useState('')
  const [newWord, setNewWord] = useState('')
  const [display, setDisplay] = useState(true)
  const [picture, setPicture] = useState('')
  const [namePicture, setNamePicture] = useState('')
  const [infos, setInfos] = useState([''])
  const [updatedOk, setUpdatedOk] = useState('')
  const [updatedImgOk, setUpdatedImgOk] = useState('')
  const [updatedTitleOk, setUpdatedTitleOk] = useState('')

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
      const res = await axios.get('http://localhost:4242/slider/cardPro')
      setNewWord(res.data[0].Text)
      setNamePicture(res.data[0].Name)
      setTitle(res.data[0].Word)
    }

    fetchData()
  }, [])

  const addId = (id, name) => {
    setDisplay(!display)
    setPicture(id)
    setNamePicture(name)
  }
  const invisible = () => {
    setUpdatedOk('')
    setUpdatedTitleOk('')
    setUpdatedImgOk('')
  }
  const updateText = async e => {
    const target = e.target.id
    const res = await axios
      .put(`http://localhost:4242/slider/cardPro/8`, {
        Text: newWord,
        Word: title
      })
      .then(res => {
        target == 'title' && setUpdatedTitleOk('Titre mis à jour')
        target == 'text' && setUpdatedOk('Texte mis à jour')
        setTimeout(invisible, 1500)
      })
  }
  const updatePicture = async () => {
    const res = await axios
      .put(`http://localhost:4242/slider/cardPro/8`, {
        Photo_id: picture
      })
      .then(res => {
        setUpdatedImgOk('Image de fond mis à jour')
        setTimeout(invisible, 1500)
      })
  }

  return (
    <section id='admin'>
      <h2>Espace pro:</h2>
      <div className='addTitleSlider'>
        <h3>Texte carte :</h3>
        <div className='form-group'>
          <input
            type='text'
            value={newWord}
            onChange={e => setNewWord(e.target.value)}
          />
          <button className='BtnAction' onClick={updateText}>
            <img
              id='text'
              alt='logo edit'
              className='logoBtn'
              src='/images/logo/save.svg'
            />
          </button>
          {updatedOk ? <p className='updateTitle'>{updatedOk}</p> : ''}
        </div>
      </div>
      <div className='addTitleSlider'>
        <h3>Texte bouton :</h3>
        <div className='form-group'>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button className='BtnAction' onClick={updateText}>
            <img
              id='title'
              alt='logo edit'
              className='logoBtn'
              src='/images/logo/save.svg'
            />
          </button>
          {updatedTitleOk ? (
            <p className='updateTitle'>{updatedTitleOk}</p>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className=''>
        <h3>Image de la carte : </h3>
        <div className='form-group'>
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
          <button onClick={updatePicture} className='BtnAction'>
            <img
              id='image'
              alt='logo edit'
              className='logoBtn'
              src='/images/logo/save.svg'
            />
          </button>
          {updatedImgOk ? <p className='updateTitle'>{updatedImgOk}</p> : ''}
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
    </section>
  )
}

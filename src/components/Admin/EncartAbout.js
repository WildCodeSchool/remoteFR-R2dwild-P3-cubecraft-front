import axios from 'axios'
import { useState, useEffect } from 'react'

export default function EncartAbout() {
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
      const res = await axios.get('http://localhost:4242/about/card')
      setNewWord(res.data[0].Text)
      setNamePicture(res.data[0].Name)
      setTitle(res.data[0].Word)
    }

    fetchData()
  }, [display])

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
    console.log('poulet')
    const target = e.target.id
    const resq = await axios
      .put(`http://localhost:4242/about/card/3`, {
        Text: newWord,
        Word: title
      })
      .then(resq => {
        target == 'title' && setUpdatedTitleOk('Titre mis à jour')
        target == 'text' && setUpdatedOk('Texte mis à jour')
        setTimeout(invisible, 1500)
      })
  }
  const updatePicture = async () => {
    const res = await axios
      .put(`http://localhost:4242/about/card/3`, {
        Photo_id: picture
      })
      .then(res => {
        setUpdatedImgOk('Image de fond mis à jour')
        setTimeout(invisible, 1500)
      })
  }

  return (
    <>
      <h2>Encart A propos :</h2>

      <div className='addTitleSlider'>
        <h3>Titre encart:</h3>
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
      <div className='addTitleSlider'>
        <h3>Texte encart :</h3>
        <div className='form-group'>
          <textarea
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
      <div className=''>
        <h3>Image de l'encart : </h3>
        <div className='form-group'>
          <input type='text' name='picture' value={namePicture} />
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
    </>
  )
}

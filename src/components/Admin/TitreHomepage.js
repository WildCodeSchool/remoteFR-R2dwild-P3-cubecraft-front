import axios from 'axios'
import { useState, useEffect } from 'react'

export default function TitreHomepage() {
  const [title, setTitle] = useState('')
  const [updatedOk, setUpdatedOk] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:4242/slider/cardPart')
      setTitle(res.data[0].Titre)
    }

    fetchData()
  }, [])
  const invisible = () => {
    setUpdatedOk('')
  }

  const updateTitle = async () => {
    const res = await axios
      .put(`http://localhost:4242/slider/cardPro/7`, {
        Titre: title
      })
      .then(res => {
        setUpdatedOk('Titre mis à jour')
        setTimeout(invisible, 1500)
      })
  }
  return (
    <div>
      <h3>Titre :</h3>
      <div className='form-group'>
        <input
          value={title}
          type='text'
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={updateTitle} className='BtnAction'>
          <img
            alt='logo edit'
            className='logoBtn'
            src='/images/logo/save.svg'
          />
        </button>
        {updatedOk ? <p className='updateTitle'>{updatedOk}</p> : ''}
      </div>
    </div>
  )
}

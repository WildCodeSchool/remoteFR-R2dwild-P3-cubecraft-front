import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import './styles/Admin.scss'

export default function AdminNewsModified() {
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [newsAdded, setNewsAdded] = useState(false)

  // a voir comment recuperer l'id dans react router
  const id = '???'
  /////
  const editNews = async () => {
    const res = await axios
      .put(`http://localhost:4242/news/:${id}`, {
        link: link,
        text: text,
        title: title,
        photo_id: image
      })
      .then(function (response) {
        console.log(response)
        setNewsAdded(true)
        setTitle('')
        setLink('')
        setText('')
        setImage('')
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <div>
      <label for='title'>Titre</label>
      <input
        type='text'
        name='title'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <label for='link'>Lien</label>
      <input
        type='text'
        name='link'
        value={link}
        onChange={event => setLink(event.target.value)}
      />
      <label for='text'>Texte</label>
      <textarea
        type='text'
        name='text'
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <label for='image'>ID de l'image</label>
      <input
        type='number'
        name='image'
        value={image}
        onChange={event => setImage(event.target.value)}
      />
      <button onClick={editNews}>Modifier la news</button>
      {newsAdded ? <div>Actu modifiée !</div> : ''}
    </div>
  )
}

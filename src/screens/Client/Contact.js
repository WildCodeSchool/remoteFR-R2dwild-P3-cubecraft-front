import React, { useState } from 'react'
import emailjs from 'emailjs-com'

import MapLeaflet from '../../components/Client/Map.js'

const Contact = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [valid, setValid] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    emailjs
      .send(
        'service_9ba3ccb',
        'template_dnukio6',
        {
          firstName,
          lastName,
          phone,
          email,
          message
        },
        'user_eyvbTv2muWvgFT0taOlAM'
      )
      .then(() => {
        setFirstName('')
        setLastName('')
        setPhone('')
        setEmail('')
        setMessage('')
        setValid(!valid)
      })
      .catch(
        () =>
          (document.querySelector('form-message').innerHTML =
            "une erreur s'est produite.")
      )
  }

  return (
    <>
      <div className='Contact'>
        <div>
          <h1 className='title-form'>Plus d'infos ?</h1>
        </div>

        <form onSubmit={handleSubmit} className='contact-form'>
          <div className='form-group'>
            <input
              placeholder='Nom / Raison sociale *'
              type='text'
              value={lastName}
              className='lastName'
              name='last_name'
              required
              onChange={event => setLastName(event.target.value)}
            />
          </div>
          <hr />

          <div className='form-group'>
            <input
              placeholder='Prénom'
              type='text'
              value={firstName}
              name='user_firstname'
              className='firstName'
              onChange={event => setFirstName(event.target.value)}
            />
          </div>
          <hr />

          <div className='form-group'>
            <input
              placeholder='Email *'
              type='email'
              name='user_email'
              value={email}
              className='email'
              required
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <hr />

          <div className='form-group'>
            <input
              type='tel'
              pattern='[0-9]{10}'
              maxLength='10'
              placeholder='Téléphone'
              value={phone}
              className='phone'
              onChange={event => setPhone(event.target.value)}
            />
          </div>
          <hr />

          <div className='form-group'>
            <textarea
              placeholder='Message *'
              value={message}
              name='message'
              required
              className='form-textarea'
              maxLength='150'
              onChange={event => setMessage(event.target.value)}
            />
          </div>
          <hr />
          {valid && <p className='p-valid'>Message envoyé</p>}
          <div className='form-group'>
            <input className='form-btn' type='submit' value='Envoyer' />
          </div>
          <div className='consent'>
            <input className='input-consent' type='checkbox' required />
            <p className='p-consent'>
              En soumettant ce formulaire, j'accepte que les informations
              saisies soient exploitées dans le cadre de la relation commerciale
              qui pourrait en découler.
            </p>
          </div>
        </form>
      </div>
      <MapLeaflet />
    </>
  )
}

export default Contact

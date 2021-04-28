import React from 'react'

export default function EncartConcept({ imageEncart, titleH3, texte, link }) {
  function createMarkup() {
    return { __html: texte }
  }
  return (
    <section className='encart_concept'>
      <div
        className='responsive'
        style={{
          backgroundImage: `url(${imageEncart})`
        }}
      >
        <ul>
          <li>
            <h3>{titleH3}</h3>
            <p
              className='tinyelement'
              dangerouslySetInnerHTML={createMarkup()}
            />
          </li>
          {link && (
            <li className='Center'>
              <a href=''>{link}</a>
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}

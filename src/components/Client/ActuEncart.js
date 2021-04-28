import React from 'react'

export default function ActuEncart({
  imageEncart,
  titleH3,
  text,
  link,
  linktext
}) {
  function createMarkup() {
    return { __html: text }
  }
  return (
    <ul className='actu_card'>
      <li>
        <div
          className='imgActu'
          style={{
            backgroundImage: `url(${imageEncart})`
          }}
        ></div>
      </li>
      <ul className='actu_text'>
        <li>
          <h3>{titleH3}</h3>
        </li>
        <li>
          <p dangerouslySetInnerHTML={createMarkup()}></p>
        </li>
        {link && (
          <li>
            <a href={link} target='_blanck'>
              www.{linktext}
            </a>
          </li>
        )}
      </ul>
    </ul>
  )
}

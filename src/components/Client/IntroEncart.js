import React from 'react'

export default function IntroEncart({ imageEncart, titleH3, link, target }) {
  return (
    <ul
      style={{
        backgroundImage: `url(${imageEncart})`
      }}
    >
      <li>
        <h3>{titleH3}</h3>
      </li>
      <li>
        <a href={target}>{link}</a>
      </li>
    </ul>
  )
}

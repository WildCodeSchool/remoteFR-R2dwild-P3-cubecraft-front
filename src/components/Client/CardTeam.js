import React from 'react'

export default function CardTeam({
  imagePlayer,
  FirstName,
  LastName,
  Position,
  Description
}) {
  function createMarkup() {
    return {__html: Description};
  }
  return (
    <div className='player'>
      <div
        className='card-header'
        style={{
          backgroundImage: `url(${imagePlayer})`
        }}
      ></div>
      <div className='card-content'>
        <h3>
          <span>{FirstName} </span>
          <span> {LastName}</span>
        </h3>
        <h4>{Position}</h4>
        <p  dangerouslySetInnerHTML= {createMarkup()}></p>
      </div>
    </div>
  )
}

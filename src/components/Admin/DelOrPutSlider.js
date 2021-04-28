import { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

export default function DelOrPutSlider(props) {
  const [text, setText] = useState(props.text)
  const [update, setUpdate] = useState(false)
  function updateSlider(id, t) {
    axios
      .put(`http://localhost:4242/slider/${id}`, {
        Word: t
      })
      .then(response => {
        if (response.status === 200) {
          setUpdate(true)
          setTimeout(() => {
            setUpdate(false)
          }, 2000)
        }
      })
  }

  return (
    <div className='admin_general_Del_Edit'>
      <div>
        <input
          id={props.id}
          value={text || text === '' ? text : props.text}
          onChange={e => setText(e.target.value)}
          type='text'
        />
        {update ? '💾✔️' : ''}
      </div>
      <div>
        <button className='BtnAction' onClick={props.handleClickSupp}>
          <img
            alt='logo del'
            className='logoBtn'
            src='/images/logo/trash.svg'
          />
        </button>
        <button
          className='BtnAction'
          id={`btnsliderUp-${props.idUpdate}`}
          onClick={() => updateSlider(props.id, text)}
        >
          <img
            alt='logo edit'
            className='logoBtn'
            src='/images/logo/save.svg'
          />
        </button>
      </div>
    </div>
  )
}

DelOrPutSlider.propTypes = {
  name: PropTypes.string,
  handleClickSupp: PropTypes.func,
  handleClickEdit: PropTypes.func,
  handleClickPut: PropTypes.func
}

import React from 'react'
import PropTypes from 'prop-types'

export default function SuppOrEdit(props) {
  return (
    <div className='admin_general_Del_Edit'>
      <span>
        <p> {props.name}</p>
      </span>
      <div>
        <button className='BtnAction' onClick={props.handleClickSupp}>
          <img
            alt='logo del'
            className='logoBtn'
            src='/images/logo/trash.svg'
          />
        </button>
        <button className='BtnAction' onClick={props.handleClickEdit}>
          <img
            alt='logo edit'
            className='logoBtn'
            src='/images/logo/edit.svg'
          />
        </button>
      </div>
    </div>
  )
}

SuppOrEdit.propTypes = {
  name: PropTypes.string,
  handleClickSupp: PropTypes.func,
  handleClickEdit: PropTypes.func
}

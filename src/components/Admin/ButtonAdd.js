import React from 'react'
import PropTypes from 'prop-types'

export default function ButtonAdd(props) {
  return (
    <div className='admin_general_Add_Field'>
      <p> {props.name}</p>
      <button  className="BtnAction" onClick={props.handleClickAdd}><img alt="logo add" className="logoBtn" src="/images/logo/add.svg"/></button>
    </div>
  )
}

ButtonAdd.propTypes = {
  name: PropTypes.string,
  handleClickAdd: PropTypes.func
}

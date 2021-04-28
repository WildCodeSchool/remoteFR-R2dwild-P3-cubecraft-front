import React from 'react'
import { Link } from 'react-router-dom'
import { navbarlinks } from './Navlinks'

export default function Navbar({ click, stateBt }) {
  return (
    <nav className='navbar'>
      <Link to='/'>
        <img src='/images/Highcubelogo.png' />
      </Link>
      <ul className='navbar__links'>
        {navbarlinks.map((link, i) => (
          <li key={i}>
            <Link to={link.route}>{link.linkname}</Link>
          </li>
        ))}
      </ul>

      <div className={stateBt} onClick={click}>
        <div className='b1'></div>
        <div className='b2'></div>
        <div className='b3'></div>
      </div>
    </nav>
  )
}

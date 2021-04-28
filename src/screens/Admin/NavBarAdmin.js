import { navbar } from '../../components/Admin/navbarLink'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export default function NavBarAdmin({ displayLog }) {
  let history = useHistory()

  const handleConnect = e => {
    e.preventDefault()
    localStorage.removeItem('adminUser')
    window.location.reload(true)
    history.push('/admin/login/')
  }

  return (
    <div className='admin_navbarcontainer'>
      <img src='/images/Highcubelogo.png' width='100px' className='logo' />

      <button
        onClick={handleConnect}
        style={{
          display: `${displayLog}`,
          width: '76px',
          margin: '2rem auto'
        }}
      >
        Logout
      </button>
      <ul className='admin_navbar_link'>
        {navbar.map((link, i) => (
          <li key={i}>
            <Link to={link.route}>{link.linkname}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

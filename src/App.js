import './App.scss'
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'
import { useState, useEffect } from 'react'

import About from './screens/Client/About'
import AdminAboutUs from './screens/Admin/AdminAboutUs'
import Connexion from './screens/Admin/Login'
import AdminAboutUsAdd from './screens/Admin/AdminAboutUsAdd'
import AdminAboutUsModified from './screens/Admin/AdminAboutUsModified'
import AdminConcept from './screens/Admin/AdminConcept'
import AdminConceptAdd from './screens/Admin/AdminConceptAdd'
import AdminConceptModified from './screens/Admin/AdminConceptModified'
import AdminEncart from './screens/Admin/AdminEncart'
import AdminEncartAdd from './screens/Admin/AdminEncartAdd'
import AdminEncartModified from './screens/Admin/AdminEncartModified'
import AdminNews from './screens/Admin/AdminNews'
import AdminNewsAdd from './screens/Admin/AdminNewsAdd'
import AdminNewsModified from './screens/Admin/AdminNewsModified'
import AdminPart from './screens/Admin/AdminPart'
import AdminPartAdd from './screens/Admin/AdminPartAdd'
import AdminPartModified from './screens/Admin/AdminPartModified'
import AdminPhotos from './screens/Admin/AdminPhotos'
import AdminPhotosAdd from './screens/Admin/AdminPhotosAdd'
import AdminPro from './screens/Admin/AdminPro'
import AdminProAdd from './screens/Admin/AdminProAdd'
import AdminProModified from './screens/Admin/AdminProModified'
import AdminSlider from './screens/Admin/AdminSlider'
import Backdrop from './components/Client/Backdrop'
import Concept from './screens/Client/Concept'
import Contact from './screens/Client/Contact'
import Footer from './components/Client/Footer'
import Home from './screens/Client/Home'
import Navbar from './components/Client/Navbar'
import NavBarAdmin from './screens/Admin/NavBarAdmin'
import News from './screens/Client/News'
import Particular from './screens/Client/Particular'
import Pro from './screens/Client/Pro'
import SideDrawer from './components/Client/SideDrawer'

const App = () => {
  const [sideToggle, setSideToggle] = useState(false)
  const [displayLog, setDisplayLog] = useState('')

  useEffect(() => {
    localStorage.adminUser ? setDisplayLog('block') : setDisplayLog('none')
  })

  return (
    <Router>
      <div
        className='App'
        style={{
          display: `${location.pathname.includes('admin') ? 'flex' : 'block'}`
        }}
      >
        {/* Test adress if location contain Admin we get the Nav of admin else the Nav site */}
        {location.pathname.includes('admin') ? (
          <NavBarAdmin displayLog={displayLog} />
        ) : (
          <>
            <Navbar
              stateBt={`hamburger__menu ${sideToggle ? 'close' : ''}`}
              click={() =>
                sideToggle ? setSideToggle(false) : setSideToggle(true)
              }
            />

            <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
            <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
          </>
        )}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/concept' component={Concept} />
          <Route path='/contact' component={Contact} />
          <Route path='/news' component={News} />
          <Route path='/particular' component={Particular} />
          <Route path='/pro' component={Pro} />
          <Route
            path='/admin/about/profile/:id'
            component={AdminAboutUsModified}
          />
          <Route exact path='/admin'>
            <Redirect to='/admin/login' />
          </Route>
          <Route path='/admin/login' component={Connexion} />
          <Route path='/admin/about/profile' component={AdminAboutUsAdd} />
          <Route path='/admin/about' component={AdminAboutUs} />
          <Route path='/admin/actualites/add' component={AdminNewsAdd} />
          <Route
            path='/admin/actualites/modif/:id'
            component={AdminNewsModified}
          />
          <Route path='/admin/actualites' component={AdminNews} />
          <Route
            path='/admin/concept/modified/:id'
            component={AdminConceptModified}
          />
          <Route path='/admin/concept/add' component={AdminConceptAdd} />
          <Route path='/admin/concept' component={AdminConcept} />
          <Route path='/admin/professionnel/add' component={AdminProAdd} />
          <Route path='/admin/slider' component={AdminSlider} />
          <Route
            path='/admin/encart/modified/:id'
            component={AdminEncartModified}
          />
          <Route path='/admin/encart/add' component={AdminEncartAdd} />
          <Route path='/admin/encart' component={AdminEncart} />
          <Route
            path='/admin/particulier/modif/:id'
            component={AdminPartModified}
          />
          <Route path='/admin/particulier/add' component={AdminPartAdd} />
          <Route path='/admin/particulier' component={AdminPart} />
          <Route path='/admin/photos/add' component={AdminPhotosAdd} />
          <Route path='/admin/photos' component={AdminPhotos} />
          <Route
            path='/admin/professionnel/modif/:id'
            component={AdminProModified}
          />
          <Route path='/admin/professionnel/add' component={AdminProAdd} />
          <Route path='/admin/professionnel' component={AdminPro} />
          <Route path='/admin/slider' component={AdminSlider} />
        </Switch>
        {/* Test adress if location contain Admin we get the Nav of admin else the Nav site */}
        {location.pathname.includes('admin') ? '' : <Footer />}
      </div>
    </Router>
  )
}

export default App

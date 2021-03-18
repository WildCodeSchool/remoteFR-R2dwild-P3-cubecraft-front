import './App.scss'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import AdminAboutUs from './screens/Admin/AdminAboutUs'
import AdminSlider from './screens/Admin/AdminSlider'
import AdminNews from './screens/Admin/AdminNews'
import AdminNewsAdd from './screens/Admin/AdminNewsAdd'
import AdminNewsModified from './screens/Admin/AdminNewsModified'
import AdminPro from './screens/Admin/AdminPro'
import AdminProAdd from './screens/Admin/AdminProAdd'
import AdminProModified from './screens/Admin/AdminProModified'
import AdminPart from './screens/Admin/AdminPart'
import AdminPartAdd from './screens/Admin/AdminPartAdd'
import AdminPartModified from './screens/Admin/AdminPartModified'
import NavBarAdmin from './screens/Admin/NavBarAdmin'
import Home from './screens/Client/Home'
import Concept from './screens/Client/Concept'
import About from './screens/Client/About'
import Particular from './screens/Client/Particular'
import Pro from './screens/Client/Pro'
import News from './screens/Client/News'
import Footer from './components/Client/Footer'
import Contact from './screens/Client/Contact'
import Navbar from './components/Client/Navbar'

const App = () => {
  return (
    <Router>
      <div
        className='App'
        style={{
          display: `${location.pathname.includes('admin') ? 'flex' : 'block'}`
        }}
      >
        {/* Test adress if location contain Admin we get the Nav of admin else the Nav site */}
        {location.pathname.includes('admin') ? <NavBarAdmin /> : <Navbar />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/admin/slider' component={AdminSlider} />
          <Route path='/admin/about' component={AdminAboutUs} />
          <Route path='/admin/actualites/add' component={AdminNewsAdd} />
          <Route
            path='/admin/actualites/modif/:id'
            component={AdminNewsModified}
          />
          <Route path='/admin/actualites' component={AdminNews} />
          <Route path='/admin/professionnel/add' component={AdminProAdd} />
          <Route
            path='/admin/professionnel/modif/:id'
            component={AdminProModified}
          />
          <Route path='/admin/professionnel' component={AdminPro} />
          <Route path='/admin/particulier/add' component={AdminPartAdd} />
          <Route
            path='/admin/particulier/modif/:id'
            component={AdminPartModified}
          />
          <Route path='/admin/particulier' component={AdminPart} />
          <Route path='/concept' component={Concept} />
          <Route path='/contact' component={Contact} />
          <Route path='/news' component={News} />
          <Route path='/particular' component={Particular} />
          <Route path='/pro' component={Pro} />
          <Route path='/about' component={About} />
        </Switch>

        {/* Test adress if location contain Admin we get the Nav of admin else the Nav site */}

        {location.pathname.includes('admin') ? '' : <Footer />}
      </div>
    </Router>
  )
}

export default App

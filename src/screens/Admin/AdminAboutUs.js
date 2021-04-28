import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import ButtonAdd from '../../components/Admin/ButtonAdd'
import EncartAbout from '../../components/Admin/EncartAbout'
import SuppOrEdit from '../../components/Admin/SuppOrEdit'
import TitreAbout from '../../components/Admin/TitreAbout'

export default function AdminAboutUs() {
  const [datas, setDatas] = useState([''])
  const [affiched, setAffiched] = useState(true)
  const history = useHistory()

  const deleteProfile = id => {
    axios.delete(`http://localhost:4242/about/${id}`, {}).then(res => {
      setAffiched(!affiched)
    })
  }
  function AddProfile() {
    history.push(`/admin/about/profile/`)
  }

  function modifiedProfile(id) {
    history.push(`/admin/about/profile/${id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      const resq = await axios.get('http://localhost:4242/about')
      setDatas(resq.data)
    }
    fetchData()
    const token = localStorage.getItem('adminUser')
    axios({
      method: 'POST',
      url: 'http://localhost:4242/signin/protected',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.data.mess !== 'Authorized') {
        history.push('/admin/login')
      }
      const fetchData = async () => {
        const resq = await axios.get('http://localhost:4242/about/')
        setDatas(resq.data)
      }
      fetchData()
    })
  }, [affiched])

  return (
    <>
      <section id='admin'>
        <h1>A propos</h1>
        {/* Titre du slider avec bouton sauvegarde */}
        <div>
          <TitreAbout />
          <EncartAbout />
          <h2>Profils équipe</h2>
          <ButtonAdd name='Ajouter un profil' handleClickAdd={AddProfile} />
        </div>
        <div>
          {datas.map((data, index) => (
            <SuppOrEdit
              handleClickSupp={() => deleteProfile(data.Id)}
              handleClickEdit={() => modifiedProfile(data.Id)}
              key={index}
              name={data.FirstName + '  ' + data.LastName}
            ></SuppOrEdit>
          ))}
        </div>
      </section>
    </>
  )
}

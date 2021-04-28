import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import ButtonAdd from '../../components/Admin/ButtonAdd'
import SuppOrEdit from '../../components/Admin/SuppOrEdit'

export default function AdminConcept() {
  const [datas, setDatas] = useState([''])
  const [affiched, setAffiched] = useState(true)
  const history = useHistory()

  const deleteConcept = id => {
    axios.delete(`http://localhost:4242/concept/${id}`, {}).then(res => {
      setAffiched(!affiched)
    })
  }
  function AddConcept() {
    history.push(`/admin/concept/add`)
  }

  function modifiedConcept(id) {
    history.push(`/admin/concept/modified/${id}`)
  }

  useEffect(() => {
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
        const resq = await axios.get('http://localhost:4242/concept')
        setDatas(resq.data)
      }
      fetchData()
    })
  }, [affiched])

  return (
    <>
      <section id='admin'>
        <h1>Concept</h1>
        {/* Titre du slider avec bouton sauvegarde */}
        <div>
          <ButtonAdd name='Ajouter un concept' handleClickAdd={AddConcept} />
        </div>

        <div>
          {datas.map((data, index) => (
            <SuppOrEdit
              handleClickSupp={() => deleteConcept(data.Id)}
              handleClickEdit={() => modifiedConcept(data.Id)}
              key={index}
              name={data.Title}
            ></SuppOrEdit>
          ))}
        </div>
      </section>
    </>
  )
}

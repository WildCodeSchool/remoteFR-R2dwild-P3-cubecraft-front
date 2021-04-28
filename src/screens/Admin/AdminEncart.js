import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import ButtonAdd from '../../components/Admin/ButtonAdd'
import SuppOrEdit from '../../components/Admin/SuppOrEdit'

export default function AdminEncart() {
  const [datas, setDatas] = useState([''])
  const [affiched, setAffiched] = useState(true)
  const history = useHistory()

  const deleteEncart = id => {
    axios.delete(`http://localhost:4242/encart/${id}`, {}).then(res => {
      setAffiched(!affiched)
    })
  }
  function addEncart() {
    history.push(`/admin/encart/add`)
  }

  function modifiedEncart(id) {
    history.push(`/admin/encart/modified/${id}`)
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
        const resq = await axios.get('http://localhost:4242/encart')
        setDatas(resq.data)
      }
      fetchData()
    })
  }, [affiched])

  return (
    <>
      <section id='admin'>
        <h1>Encarts :</h1>
        {/* Titre du slider avec bouton sauvegarde */}
        <div>
          <ButtonAdd name='Ajouter un encart' handleClickAdd={addEncart} />
        </div>

        <div>
          {datas.map((data, index) => (
            <SuppOrEdit
              handleClickSupp={() => deleteEncart(data.Id)}
              handleClickEdit={() => modifiedEncart(data.Id)}
              key={index}
              name={data.Title}
            ></SuppOrEdit>
          ))}
        </div>
      </section>
    </>
  )
}

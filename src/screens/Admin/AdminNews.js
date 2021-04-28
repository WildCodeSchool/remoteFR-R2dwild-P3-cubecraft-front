import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import SuppOrEdit from '../../components/Admin/SuppOrEdit'
import ButtonAdd from '../../components/Admin/ButtonAdd'

export default function AdminNews() {
  const history = useHistory()
  const [datas, setDatas] = useState([''])
  const [change, setChange] = useState(false)
  const deleteNews = async id => {
    const res = await axios
      .delete(`http://localhost:4242/news/${id}`)
      .then(function (res) {
        setChange(!change)
      })
      .catch(function (error) {
        console.log(error)
      })
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
        const resq = await axios.get('http://localhost:4242/news/')
        setDatas(resq.data)
      }
      fetchData()
    })
  }, [change])

  function handleClickEdit(number) {
    history.push(`/admin/actualites/modif/${number}`)
  }

  function handleClickAdd() {
    history.push(`/admin/actualites/add`)
  }

  return (
    <>
      <section id='admin'>
        <h1>Actualités</h1>

        <div>
          <ButtonAdd name='Ajouter une news' handleClickAdd={handleClickAdd} />
        </div>

        <div>
          {datas.map((data, index) => (
            <SuppOrEdit
              handleClickSupp={() => deleteNews(data.Id)}
              handleClickEdit={() => handleClickEdit(data.Id)}
              key={index}
              name={`Article ${data.Title}`}
              id={data.Id}
            ></SuppOrEdit>
          ))}
        </div>
      </section>
    </>
  )
}

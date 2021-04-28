import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import SuppOrEdit from '../../components/Admin/SuppOrEdit'
import ButtonAdd from '../../components/Admin/ButtonAdd'

export default function AdminPart() {
  const history = useHistory()
  const [datas, setDatas] = useState([''])
  const [change, setChange] = useState(false)
  const [updatedOk, setUpdatedOk] = useState('')
  const [infos, setInfos] = useState([''])
  const [title, setTitle] = useState('')

  const deleteProduct = async id => {
    const res = await axios
      .delete(`http://localhost:4242/particularPro/${id}`)
      .then(function (response) {
        setChange(!change)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      const resq = await axios.get('http://localhost:4242/particularPro/part')
      setDatas(resq.data)
      const res = await axios.get('http://localhost:4242/particularPro/part/title')
      setTitle(res.data[0].Titre)
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
        const resq = await axios.get('http://localhost:4242/particularPro/part')
        setDatas(resq.data)
      }
      fetchData()
    })
  }, [change])

  function handleClickEdit(number) {
    history.push(`/admin/particulier/modif/${number}`)
  }

  function handleClickAdd() {
    history.push(`/admin/particulier/add`)
  }

  const updateInfos = async () => {
    const res = await axios
      .put(`http://localhost:4242/particularPro/part/title/5`, {
        Titre: title
      })
      .then(res => {
        setUpdatedOk('Titre mis à jour')
      })
  }


  return (
    <>
      <section id='admin'>
        <h1>Produits pour particuliers</h1>
        <div>
        <h3>Titre</h3>
        <div className='form-group'>
          <input
            value={title}
            type='text'
            onChange={e => setTitle(e.target.value)}
          />
          <button onClick={updateInfos} className='BtnAction'>
            <img
              alt='logo edit'
              className='logoBtn'
              src='/images/logo/save.svg'
            />
          </button>
          {updatedOk ? <p className='updateTitle'>{updatedOk}</p> : ''}
        </div>
      </div>
        <div>
          <ButtonAdd
            name='Ajouter un produit'
            handleClickAdd={handleClickAdd}
          />
        </div>

        <div>
          {datas.map((data, index) => (
            <SuppOrEdit
              handleClickSupp={() => deleteProduct(data.Id)}
              handleClickEdit={() => handleClickEdit(data.Id)}
              key={index}
              name={data.CategoryName + ' ' + data.Price + '€'}
              id={data.Id}
            ></SuppOrEdit>
          ))}
        </div>
      </section>
    </>
  )
}
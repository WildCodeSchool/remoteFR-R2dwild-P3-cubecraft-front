import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import SuppOrEdit from '../../components/Admin/SuppOrEdit'
import ButtonAdd from '../../components/Admin/ButtonAdd'

export default function AdminPro() {
  const history = useHistory()
  const [datas, setDatas] = useState([''])
  const [change, setChange] = useState(false)
  const [title, setTitle] = useState('')
  const [updatedOk, setUpdatedOk] = useState('')
  const [infos, setInfos] = useState([''])

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
      const resq = await axios.get('http://localhost:4242/particularPro/pro')
      setDatas(resq.data)
      const res = await axios.get('http://localhost:4242/particularPro/pro/title')
      setTitle(res.data[0].Titre)
    }
    fetchData()
  }, [change])

  function handleClickEdit(number) {
    history.push(`/admin/professionnel/modif/${number}`)
  }

  function handleClickAdd() {
    history.push(`/admin/professionnel/add`)
  }

  const updateInfos = async () => {
    const res = await axios
      .put(`http://localhost:4242/particularPro/pro/title/6`, {
        Titre: title
      })
      .then(res => {
        setUpdatedOk('Titre mis à jour')
      })
  }

  return (
    <>
      <section id='admin'>
        <h1>Produits pour professionnels</h1>
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

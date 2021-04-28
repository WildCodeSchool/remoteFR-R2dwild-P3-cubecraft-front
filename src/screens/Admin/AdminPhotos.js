import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import ButtonAdd from '../../components/Admin/ButtonAdd'

export default function AdminPhotos() {
  const [datas, setDatas] = useState([''])
  const [affiched, setAffiched] = useState(true)
  const history = useHistory()

  function AddPhoto() {
    history.push(`/admin/photos/add`)
  }
  const deletePhoto = (id, name) => {
    axios
      .delete(
        `http://localhost:4242/photos/${id}/${name.replace('/images/', '')}`,
        {}
      )
      .then(res => {
        setAffiched(!affiched)
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
        const resq = await axios.get('http://localhost:4242/photos')
        setDatas(resq.data)
      }
      fetchData()
    })
  }, [affiched])

  return (
    <>
      <section id='admin'>
        <h1>Photos</h1>
        <div>
          <ButtonAdd name='Ajouter une photo' handleClickAdd={AddPhoto} />
        </div>
        <div className='Container-Image-Storage'>
          {datas.map((data, index) => (
            <>
              <div className='imageInStorage'>
                <img className='img-upload' key={index} src={`${data.Name}`} />
                <button
                  className='BtnAction'
                  onClick={() => deletePhoto(data.Id, data.Name)}
                >
                  <img
                    alt='logo add'
                    className='logoBtn'
                    src='/images/logo/trash.svg'
                  />
                </button>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  )
}

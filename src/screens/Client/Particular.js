import axios from 'axios'
import { useState, useEffect } from 'react'
import EncartSite from '../../components/Client/EncartSite'

export default function Particular() {
  const [datas, setDatas] = useState([''])
  const [infos, setInfos] = useState([''])
  useEffect(() => {
    const fetchData = async () => {
      const resq = await axios.get(
        `http://localhost:4242/particularPro/part/detail`
      )
      setDatas(resq.data)
      const res = await axios.get(
        `http://localhost:4242/particularPro/part/title`
      )
      setInfos(res.data[0].Titre)

    }
    fetchData()
  }, [])

  return (
    <div>
      <h2 className='uCenter'>{infos}</h2>

      {datas.map((data, index) => (
        <EncartSite
          key={index}
          imageEncart={data.Name}
          titleH3={data.CategoryName}
          texte={data.Description}
          price={data.Price}
          link='contact'
        ></EncartSite>
      ))}
    </div>
  )
}

import axios from 'axios'
import { useState, useEffect } from 'react'
import ActuEncart from '../../components/Client/ActuEncart'
import { History } from 'react-router-dom'

export default function News() {
  const [datas, setDatas] = useState([''])
  const [linkOk, setLinkOk] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resq = await axios.get(`http://localhost:4242/news`)
      setDatas(resq.data)
    }
    fetchData()
  }, [])

  return (
    <section id='actu'>
      <h2 className='uCenter'>Actualités</h2>
      <div className='responsive'>
        {datas.map((data, index) => (
          <ActuEncart
            key={index}
            imageEncart='images/Annexe6.jpg'
            titleH3={data.Title}
            text={data.Text}
            link={data.Link}
            linktext={
              // data.Link ? data.Link.includes('https://') ? data.Link > 25 ? data.Link.substring(0,25): data.Link.replace('https://www.', "") : null
              data.Link ? data.Link.length > 26 ? data.Link.substring(0, 30).replace("https://www." ,"") + "..." : data.Link.replace("https://www." ,"") : data.Link
            }
          />
        ))}
      </div>
    </section>
  )
}

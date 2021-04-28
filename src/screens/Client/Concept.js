import { useEffect, useState } from 'react'
import axios from 'axios'
import EncartConcept from '../../components/Client/EncartConcept'

function Concept() {
  const [datas, setDatas] = useState([''])

  useEffect(() => {
    const fetchData = async () => {
      const resq = await axios.get(`http://localhost:4242/concept/detail`)
      setDatas(resq.data)
    }
    fetchData()
  }, [])

  return (
    <div className='concept-block'>
      <h2 className='uCenter'>Un concept avec de nombreux avantages.</h2>

      {datas.map((info, index) => (
        <>
          <EncartConcept
            imageEncart={info.Name}
            key={index}
            titleH3={info.Title}
            texte={info.Text}
          />
        </>
      ))}
    </div>
  )
}

export default Concept

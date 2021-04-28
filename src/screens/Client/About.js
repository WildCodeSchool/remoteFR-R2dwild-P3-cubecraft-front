import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ActuEncart from '../../components/Client/ActuEncart'
import CardTeam from '../../components/Client/CardTeam'

function About() {
  const [datas, setDatas] = useState([''])
  const [title, setTitle] = useState([''])
  const [word, setWord] = useState([''])
  const [image, setImage] = useState([''])
  const [text, setText] = useState([''])
  useEffect(() => {
    const fetchData = async () => {
      const resq = await axios.get(`http://localhost:4242/about/detail`)
      setDatas(resq.data)
      const res = await axios.get(`http://localhost:4242/about/card`)
      setTitle(res.data[0].Titre)
      setWord(res.data[0].Word)
      setImage(res.data[0].Name)
      setText(res.data[0].Text)
    }
    fetchData()
  }, [])

  return (
    <div className='about'>
      <section id='presentation'>
        <h2 className='uCenter'>{title}</h2>
        <div className='responsive'>
          <ActuEncart imageEncart={image} titleH3={word} text={text} />
        </div>
      </section>
      <section id='team'>
        <h2>Présentation de l'équipe highcube</h2>
        <div className='encart'>
          {datas.map((info, index) => (
            <>
              <CardTeam
                imagePlayer={info.Name}
                key={index}
                FirstName={info.FirstName}
                LastName={info.LastName}
                Position={info.JobName}
                Description={info.Description}
              />
            </>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About

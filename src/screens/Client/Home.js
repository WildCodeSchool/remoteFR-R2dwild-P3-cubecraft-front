import ScrollingText from './ScrollingText'
import IntroEncart from '../../components/Client/IntroEncart'
import EncartConcept from '../../components/Client/EncartConcept'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
  const [datas, setDatas] = useState([''])
  const [pro, setPro] = useState([''])
  const [part, setPart] = useState([''])
  const [encart, setEncart] = useState([''])

  useEffect(() => {
    const fetchData = async () => {
      const resq = await axios.get(`http://localhost:4242/slider/title`)
      setDatas(resq.data)
      const res = await axios.get(`http://localhost:4242/slider/cardPro`)
      setPro(res.data)
      const response = await axios.get(`http://localhost:4242/slider/cardPart`)
      setPart(response.data)
      const resp = await axios.get(`http://localhost:4242/encart/detail`)
      setEncart(resp.data)
    }
    fetchData()
  }, [])

  return (
    <div>
      {datas.map(info => (
        <>
          <div
            className='Home'
            style={{
              backgroundImage: `url(${info.Name})`
            }}
          >
            <div className='home-hero-carousel'>
              <h1 className='home-title'>{info.Titre}</h1>
              <div className='carousel-text'>
                <ScrollingText />
              </div>
            </div>
          </div>
        </>
      ))}

      {/* Encart intro */}
      <div className='concept-block'>
        {part.map(infoPart => (
          <>
            <h2>{infoPart.Titre}</h2>
          </>
        ))}
        {encart.map(enc => (
          <>
            <EncartConcept
              imageEncart={enc.Name}
              titleH3={enc.Title}
              texte={enc.Text}
              link='Découvrir nos offres'
            />
          </>
        ))}
      </div>
      <section className='concept'>
        {part.map(infoPart =>
          pro.map(infoPro => (
            <>
              <div className='responsive'>
                <IntroEncart
                  imageEncart={infoPart.Name}
                  titleH3={infoPart.Text}
                  link={infoPart.Word}
                  target='particular'
                />

                <IntroEncart
                  imageEncart={infoPro.Name}
                  titleH3={infoPro.Text}
                  link={infoPro.Word}
                  target='pro'
                />
              </div>
            </>
          ))
        )}
      </section>
    </div>
  )
}

export default Home

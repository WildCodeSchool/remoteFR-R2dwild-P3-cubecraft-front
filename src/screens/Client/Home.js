import { Link } from 'react-router-dom'
import ScrollingText from './ScrollingText'
import IntroEncart from '../../components/Client/IntroEncart'

function Home() {
  return (
    <div>
      <div
        className='Home'
        style={{
          backgroundImage: `url("images/Annexe1.jpg")`
        }}
      >
        <div className='home-hero-carousel'>
          <h1 className='home-title'>Une solution</h1>
          <div className='carousel-text'>
            <ScrollingText />
          </div>
        </div>
      </div>

      <section id='concept'>
        <h2>
          HIGH CUBE ECO DESIGN, spécialiste de la construction en conteneur
          maritime.
        </h2>
        <div className='responsive'>
          <IntroEncart
            imageEncart='images/Annexe6.jpg'
            titleH3='Vous êtes un particulier ?'
            link='Découvez nos solutions'
          />

          <IntroEncart
            imageEncart='images/Annexe5.jpg'
            titleH3='Vous êtes un professionnel ?'
            link='Découvez nos solutions'
          />
        </div>
      </section>

      <section id='home-produits'>
        <div className='produits-pro'>
          <img className='img-produits' src='images/Annexe1.jpg' alt='maison' />
          <div className='produits-right'>
            <h2>Professionnels</h2>
            <p>
              Iam in altera philosophiae parte. quae est quaerendi ac
              disserendi, quae logikh dicitur, iste vester plane, ut mihi quidem
              videtur, inermis ac nudus est. tollit definitiones, nihil de
              dividendo ac
            </p>
            <Link className='button' to='/pro'>
              Découvrez nos solutions
            </Link>
          </div>
        </div>
        <div className='produits-part'>
          <div className='produits-right'>
            <h2>Particuliers</h2>
            <p>
              Iam in altera philosophiae parte. quae est quaerendi ac
              disserendi, quae logikh dicitur, iste vester plane, ut mihi quidem
              videtur, inermis ac nudus est. tollit definitiones, nihil de
              dividendo ac
            </p>
            <Link className='button' to='/particular'>
              Découvrez nos solutions
            </Link>
          </div>
          <img className='img-produits' src='images/Annexe2.jpg' alt='maison' />
        </div>
      </section>
      <section id='home-actualite'>
        <h2>Notre actualités</h2>
        <ul className='container-thumbnail-actualite'>
          <li>
            <img
              className='thumbnails-actualite'
              src='images/Annexe4.jpg'
              alt='actu'
            />
            <h3>Titre</h3>
            <p>jkfdjfkdsjfkds jfkdsjfdsk jfkdsjfkds</p>
          </li>
          <li>
            <img
              className='thumbnails-actualite'
              src='images/Annexe4.jpg'
              alt='actu'
            />
            <h3>Titre</h3>
            <p>jkfdjfkdsjfkds jfkdsjfdsk jfkdsjfkds</p>
          </li>
          <li>
            <img
              className='thumbnails-actualite'
              src='images/Annexe4.jpg'
              alt='actu'
            />
            <h3>Titre</h3>
            <p>jkfdjfkdsjfkds jfkdsjfdsk jfkdsjfkds</p>
          </li>
        </ul>
        <Link className='button' to='/news'>
          Toute notre actualités
        </Link>
      </section>
    </div>
  )
}

export default Home

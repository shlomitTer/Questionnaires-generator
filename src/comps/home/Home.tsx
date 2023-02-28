import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTING_PATHS } from '../../app/constants';
import ShareButtons from '../shareButtons/ShareButtons';
import './home.scss'
const Home = () => {
  const nav = useNavigate();

  useEffect(() => {
    document.title = 'Home'
  }, [])

  const handleClick = () => {
    nav(APP_ROUTING_PATHS.CREATE)
  }
  return (
    <div className='home'>
      <div className="container">
        <ShareButtons url={"/"} title={"hi! i want to share with you a Questionnaire generator website"} />
        <h1>Questionnaire<br /> generator</h1>
        <button className='designedButton' onClick={handleClick}><span data-hover="create"> start</span></button>
      </div>
    </div>

  )
}

export default Home
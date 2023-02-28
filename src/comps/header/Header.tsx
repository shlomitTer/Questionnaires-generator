import React from 'react'
import { useNavigate } from 'react-router-dom';
import { APP_ROUTING_PATHS } from '../../app/constants';
import { useAppDispatch } from '../../app/store';
import { resetQuestionId } from '../../features/slices/questions.slice';
import { resetQuizId } from '../../features/slices/quiz.slice';
import './header.scss'
interface IProps {
  setIsActiveMenu: React.Dispatch<React.SetStateAction<boolean>>
  isActiveMenu: boolean
}
const Header = ({ setIsActiveMenu, isActiveMenu }: IProps) => {
  const nav = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <header className='container'>
      <button className="material-symbols-outlined burger" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsActiveMenu(!isActiveMenu)
      }}>
        menu
      </button>

      <nav className={`${isActiveMenu && 'active-nav'}`}>
        <ul>
          <li><a className='logo' onClick={(e) => {
            nav(APP_ROUTING_PATHS.HOME)
          }}>Q</a></li>
          <li><a onClick={(e) => {
            dispatch(resetQuizId())
            dispatch(resetQuestionId())
            nav(APP_ROUTING_PATHS.CREATE)
          }}>Create</a></li>
          <li><a onClick={() => {
            nav(APP_ROUTING_PATHS.ALL_QUIZZES)
          }}>All Quizzes</a></li>
        </ul>
      </nav>
    </header >
  )
}

export default Header
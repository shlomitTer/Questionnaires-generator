import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store';
import { getQuestions, IQuestion } from '../../features/slices/questions.slice';
import { getFilteredQuizzes, getFullQuiz, getQuizzes } from '../../features/slices/quiz.slice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { APP_ROUTING_PATHS } from '../../app/constants';
import { EAPIStatus } from '../../shared/api/models';
import Loading from '../loading/Loading';

const List = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { allQuizzes, currentQuiz, error, status } = useAppSelector(state => state.quizSlice);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  useEffect(() => {
    document.title = 'List'
  }, [])
  useEffect(() => {
    dispatch(getQuizzes())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 400)
  }, [loading])

  const handleClick = (id: number) => {

    nav(APP_ROUTING_PATHS.VOTE + "/" + id)
  }

  const shortenString = (str: string): string => {
    if (str.length <= 15) {
      return str;
    } else {
      return str.slice(0, 15) + "...";
    }
  }

  return (

    <div className=' container'>
      {
        status === EAPIStatus.PENDING || loading ? <Loading /> :
          <div className='flex-container' >
            {
              allQuizzes && allQuizzes.map(item => <button className={"flex-button"} key={item.id}
                onClick={() => handleClick(item.id)}
              >
                <span data-hover="start"> {shortenString(item.name)}</span>
              </button>)
            }
          </div>
      }
    </div>
  )
}

export default List
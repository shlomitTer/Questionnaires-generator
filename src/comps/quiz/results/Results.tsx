import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { getFullQuiz } from '../../../features//slices/quiz.slice';
import { getTypes, IType } from '../../../features/slices/types.slice';
import { APP_ROUTING_PATHS } from '../../../app/constants';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import Loading from '../../../comps/loading/Loading';
import './results.scss'

const Results = () => {
  const [typeTrivia, setTypeTrivia] = useState<IType>()
  const [loading, setLoading] = useState<boolean>(true)
  const { results, currentUserAnswers, status } = useAppSelector(state => state.quizSlice);
  const { typesArray } = useAppSelector(state => state.typeSlice);
  const dispatch = useAppDispatch();
  const { idQuiz } = useParams();
  const nav = useNavigate();


  useEffect(() => {
    document.title = 'Results'
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 400)
  }, [loading])

  useEffect(() => {
    dispatch(getTypes())
  }, [])

  useEffect(() => {
    const trivia = typesArray.find(obj => obj.name === 'trivia')
    setTypeTrivia(trivia)
  }, [typesArray])

  useEffect(() => {
    if (currentUserAnswers.quizId < 1)
      nav(APP_ROUTING_PATHS.ALL_QUIZZES)
  }, [currentUserAnswers])

  useEffect(() => {
    dispatch(getFullQuiz(Number(idQuiz)))
  }, [])

  return (
    <div className='container'>
      {
        status === 'pending' || loading ? <Loading /> :
          <form>
            <div className='results'>
              <h2>{results.quiz?.name}</h2>
              <p>{results.quiz?.description}</p>
              {!results.questionsArray?.length && <p>There are no questions to display</p>}

              {
                results.questionsArray && results.questionsArray.map((question, index) => <fieldset key={question.id}>
                  <h3>{question.text}</h3>
                  {question.answersArray && question.answersArray.map(ans => {
                    return <p key={ans.id} className={`${(ans.isCorrect === true) && (question.typeId === typeTrivia?.id) && "correct"} ${(question.typeId === typeTrivia?.id) && (ans.id == currentUserAnswers.answersArray[index].answerId) && (ans.isCorrect === false) && 'wrong'}`}>
                      <label className={` block-label`}><input type="radio" defaultChecked={ans.id == currentUserAnswers.answersArray[index].answerId} />
                        {ans.text} </label><span>{ans.numbersOfVotes} votes</span>
                    </p>
                  })}
                </fieldset>

                )}
            </div>
          </form>
      }
    </div>
  )
}




export default Results;

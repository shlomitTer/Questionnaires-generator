import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { APP_ROUTING_PATHS } from '../../../app/constants';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { getQuiz, ISOlvedQuiz, saveAnswers, voteQuiz } from '../../../features/slices/quiz.slice';
import ShareButtons from '../../../comps/shareButtons/ShareButtons';
import Loading from '../../loading/Loading';

const Quiz = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { currentQuiz, status } = useAppSelector(state => state.quizSlice);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ISOlvedQuiz>();
  const { idQuiz } = useParams();

  useEffect(() => {
    document.title = 'Quiz'
  }, [])

  useEffect(() => {
    dispatch(getQuiz(Number(idQuiz)))
  }, [])



  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 400)
  }, [loading])


  const onSubmit = (data: ISOlvedQuiz) => {
    const formData = { ...data }
    const questionsIds = currentQuiz.questionsArray.map(que => que.id);
    formData.answersArray.map((item, index) => item.questionId = questionsIds[index])
    formData.quizId = currentQuiz.quiz.id;
    dispatch(saveAnswers(formData))
    dispatch(voteQuiz(formData))
    nav(APP_ROUTING_PATHS.RESULTS + "/" + idQuiz)

  }

  return (
    <div className='container '>
      {
        status === 'pending' || loading ? <Loading /> :
          <form onSubmit={handleSubmit(onSubmit)}>
            <ShareButtons url={APP_ROUTING_PATHS.VOTE} title={"Hi! i want to share with you a quiz"} />
            <h2>{currentQuiz.quiz.name}</h2>
            <p>{currentQuiz.quiz.description}</p>
            {!currentQuiz.questionsArray?.length && <p>There are no questions to display</p>}

            {
              currentQuiz.questionsArray && currentQuiz.questionsArray.map((question, index) => <fieldset key={question.id}>
                <h3>{question.text}</h3>
                {question.answersArray && question.answersArray.map(ans => {
                  return <p key={ans.id}>
                    <label className={` block-label`}><input type="radio" value={ans.id} required {...register(`answersArray.${index}.answerId`, { required: true })} />
                      {ans.text} </label>
                  </p>
                })}
              </fieldset>

              )}
            {
              currentQuiz.questionsArray?.length &&
              <button className='designedButton'><span data-hover="check">send</span></button>
            }
          </form>
      }
    </div>
  )
}

export default Quiz
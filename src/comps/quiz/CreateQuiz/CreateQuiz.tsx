import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTING_PATHS } from '../../../app/constants';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import Loading from '../../../comps/loading/Loading';
import { createQuiz } from '../../../features/slices/quiz.slice';


interface IFormInput {
  name: string,
  description: string,
}

const CreateQuiz = () => {

  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const { newQuizId, status } = useAppSelector(state => state.quizSlice);
  const nav = useNavigate();

  useEffect(() => {
    document.title = 'Create'
  }, [])

  useEffect(() => {
    if (newQuizId > 0)
      nav(`${APP_ROUTING_PATHS.ADD_QUESTION + "/" + newQuizId}`)
  }, [newQuizId])

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(createQuiz(data));

  }

  return (
    <div className='container'>
      {
        status === 'pending' ? <Loading /> :
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create A Quiz</h2>
            <p><textarea placeholder='name' rows={1} cols={50}{...register('name', { required: true, minLength: 1, maxLength: 99 })} /></p>
            <p><textarea rows={3} cols={50} placeholder='description' {...register('description', { required: true, minLength: 1, maxLength: 300 })} /></p>
            <button type='submit' className='designedButton'><span data-hover="create"> create</span></button>
          </form>
      }
    </div>
  )
}

export default CreateQuiz
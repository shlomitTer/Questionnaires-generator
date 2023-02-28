import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';

import { addQuestion } from '../../../features/slices/questions.slice';
import { getTypes, IType } from '../../../features/slices/types.slice';
import { getQuiz } from '../../../features/slices/quiz.slice';
import { APP_ROUTING_PATHS } from '../../../app/constants';
import { EAPIStatus } from '../../../shared/api/models';
import Loading from '../../../comps/loading/Loading';
import './addQuestionForm.scss'
import Select from '../../select/Select';


interface IAnswer {
  text: string,
  isCorrect: boolean
}
export interface IFormInput {
  text: string,
  typeId: number,
  answersArray: IAnswer[];
  quizId: number
}


let renderCount = 0;

const AddQuestion = () => {
  const [type, setType] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(true)
  const [typeTrivia, setTypeTrivia] = useState<IType>()
  const { typesArray } = useAppSelector(state => state.typeSlice);
  const { status, currentQuiz } = useAppSelector(state => state.quizSlice);
  const nav = useNavigate()
  const dispatch = useAppDispatch();
  const { idQuiz } = useParams();

  const { register, getFieldState, reset, handleSubmit, control, watch, formState: { errors } } = useForm<IFormInput>({
    defaultValues: {
      answersArray: [{ text: "", isCorrect: false },
      { text: "", isCorrect: false }]
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "answersArray"
  });

  renderCount++;
  const watchFieldArray = watch("answersArray");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });

  useEffect(() => {
    dispatch(getQuiz(Number(idQuiz)))
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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = { ...data };
    // const formData = (({ typeId, text, answersArray, quizId }) => ({ typeId, text, answersArray, quizId }))(data);
    formData.quizId = Number(idQuiz);
    if (type === typeTrivia?.id) {
      let countCorrect = 0;
      formData.answersArray.map(obj => { obj.isCorrect && countCorrect++ })
      if (countCorrect !== 1) {
        alert('Mark only one answer as correct')
        return
      }
    }

    if (formData.answersArray.length < 2) {
      alert('Add at least 2 possible answers')
      return
    }


    dispatch(addQuestion(formData));
    remove()
    reset()
    setType(-1)
    setLoading(true)
  }

  const onchangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(Number(event.target.value));
  }

  return (
    <div className='container que'>
      {
        status === EAPIStatus.PENDING || loading ? <Loading /> :
          <div>
            <div className='details'>
              <h2>{currentQuiz.quiz.name}</h2>
              <h4>{currentQuiz.quiz.description}</h4>
              <p className='end-flex'>
                <button type='button' className='designedButton' onClick={() => {
                  nav(APP_ROUTING_PATHS.VOTE + "/" + idQuiz)
                }}><span data-hover="Done"> finish</span></button>
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Add a question</h2>
              <p>
                <label> question</label>
                <textarea placeholder='question' {...register('text', { required: true, minLength: 3, maxLength: 300 })} />
                {errors.text?.type === 'required' && <span className='error' role="alert">text is required</span>}
                {errors.text?.type === 'minLength' && <span className='error' role="alert">min 3 chars</span>}
                {errors.text?.type === 'maxLength' && <span className='error' role="alert">max 300 chars</span>}
              </p>
              <p>
                <Select array={typesArray} title={'Select A Type'} name='typeId' control={control} register={register} func={onchangeType} />
                {errors.typeId?.type === 'required' && <span className='error' role="alert">Select a type</span>}

              </p>
              {controlledFields.map((field, index) => {
                return <div key={field.id}>
                  <p className='answer-area'>
                    <label>answer no. {index}</label>
                    <textarea className='answer-input' rows={1} {...register(`answersArray.${index}.text` as const, { required: true, minLength: 2, maxLength: 99 })} placeholder='answer' />
                    <button type="button" className='material-symbols-outlined undesigned_button' onClick={() => remove(index)}>close</button>
                    {errors.answersArray && errors?.answersArray[index]?.text?.type === 'required' && <span className='error' role="alert">text is required</span>}
                    {errors.answersArray && errors?.answersArray[index]?.text?.type === 'minLength' && <span className='error' role="alert">min 2 chars</span>}
                    {errors.answersArray && errors?.answersArray[index]?.text?.type === 'maxLength' && <span className='error' role="alert">max 99 chars</span>}
                  </p>
                  {
                    type == typeTrivia?.id &&
                    <p className='checkbox-line'>
                      <input
                        type="checkbox"
                        id={`input.${index} `}
                        {...register(`answersArray.${index}.isCorrect` as const)}
                      />
                      <label className='block-label small-span'>mark as correct answer</label>
                    </p>
                  }
                </div>
              })}

              <button
                title="click here"
                className='iconButton material-symbols-outlined'
                type="button"
                onClick={() =>
                  append({
                    text: "",
                    isCorrect: false
                  })
                }
              >
                add_circle
              </button>
              <button type='submit' className='designedButton'><span data-hover="create"> create</span></button>

            </form>


          </div>
      }
    </div >
  )
}

export default AddQuestion
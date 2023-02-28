import React from 'react'
import { IAnswer } from '../../../features/slices/answers.slice'
interface IProps {
  item: IAnswer
}
const Answers = (props: IProps) => {

  return (
    <p>
      {
        <label><input type="radio" name="answer" value="" /> {props.item.text} </label>
      }
    </p>
  )
}

export default Answers
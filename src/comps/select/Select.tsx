import React, { useState } from 'react'
import { IFormInput } from '../quiz/addQuestion/AddQuestion'
import './select.scss'
interface IProps {
  name: string,
  array: any[],
  title: string
  control: any,
  register: any,
  func?: any
}
interface IItem {
  name: string,
  id: number
}
const Select = (props: IProps) => {
  const [item, setItem] = useState<IItem>({
    name: "",
    id: -1
  })
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <div id="select" >
      <div className='checked' onClick={() => {
        setIsActive(!isActive)
      }}>
        {
          item.name !== "" ?
            <p className="select_label select_label-placeholder">{item.name}</p> :
            <p className="select_label select_label-placeholder disabled-label" >{props.title}</p>
        }
        {
          isActive ?
            <button type='button' className="material-symbols-outlined" onClick={() => {
              setIsActive(!isActive)
            }}>
              expand_less
            </button> :
            <button type='button' className="material-symbols-outlined"
              onClick={() => {
                setIsActive(!isActive)
              }}>
              expand_more
            </button>

        }
      </div>
      <ul className={`${isActive ? "active-list" : "inactive-list"}`}
      >
        <li>
          <label className="disabled-label">
            <input className="select_input" type="radio" name={props.name} disabled />
            {props.title}
          </label>
        </li>
        {
          props.array && props.array.map(item =>
            <li className="select_option" key={item.id}>
              <label className="select_label">
                <input className="select_input" type="radio" name={props.name} id={item.id} value={item.id}
                  {...props.register(props.name, {
                    required: true,
                  })}
                  onClick={(e) => {
                    setItem(item)
                    setIsActive(!isActive)
                    props.func(e)
                  }} />
                {item.name}</label>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default Select
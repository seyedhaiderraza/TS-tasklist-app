import React from 'react'
import './InputField.css'

type Props = {
    task: string;
    callback: React.Dispatch<React.SetStateAction<string>>;//type for setState
}
const InputField: React.FC<Props> = ({task, callback}) => {
  return (
    <div className="todo__input">
      <form className="todo__form">
        <input type="text"  placeholder="Enter a Task.." className="input__box"
         onChange={e=>callback(e.target.value)}
         value={task}
         />
        <button type="submit" className="submit__button">Add</button>
      </form>
    </div>
  )
}

export default InputField

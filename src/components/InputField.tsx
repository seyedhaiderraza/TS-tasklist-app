import React from 'react'
import './InputField.css'
const InputField = () => {
  return (
    <div className="todo__input">
      <form action="">
        <input type="text"  placeholder="Enter a Task.." className="input__box"/>
        <button type="submit" className="submit__button">Add</button>
      </form>
    </div>
  )
}

export default InputField

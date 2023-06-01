import React, { useRef } from 'react';
import './InputField.css';

type Props = {
  task: string;
  handleAddTask: (task: string) => void;
};

const InputField: React.FC<Props> = ({ task, handleAddTask }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddTask(inputRef.current?.value || '');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur()//shift acive focus away
    }
  };

  return (
    <div className="todo__input">
      <form className="todo__form" onSubmit={handleSubmit}>
        <input
          name="input__text"
          type="text"
          placeholder="Enter a Task.."
          className="input__box"
          ref={inputRef}
        />
        <button name="button__submit" type="submit" className="submit__button">
          Add
        </button>
      </form>
    </div>
  );
};

export default InputField;

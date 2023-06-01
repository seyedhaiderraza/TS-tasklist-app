import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

type Task = {
  id: number;
  task: string;
  isDone: boolean;
};

const App: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([]);

  const handleAddTask = (task: string) => {
    if (task !== '') {
      setTask(task);
      setTaskList((prev) => [
        ...prev,
        { id: prev.length + 1, task: task, isDone: false },
      ]);
    }
  };

  return (
    <div className="App">
      <span className="heading">Task List</span>
      <InputField task={task} handleAddTask={handleAddTask} />
      {task !== '' && taskList && (
        <>
          {console.log(taskList)}
          {taskList.map((task) => (
            <div className="task__list" key={task.id}>
              <p className="task__list__id">{task.id}</p>
              <div className="task__list__content">
                <p className="task__list__taskinfo">{task.task}</p>
                <div className="icons">
                  <span className="icons__delete">
                    <AiFillDelete />
                  </span>
                  <span className="icons__edit">
                    <AiFillEdit />
                  </span>
                  <span className="icons__done">
                    <MdDone />
                  </span>
                </div>
              </div>
              <p className="task__list__isDone"></p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;

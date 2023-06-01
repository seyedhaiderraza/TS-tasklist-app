import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import {SyntheticEvent} from 'react'
import { log } from 'console';

type Task={
  id: number,
  task: string,
  isDone: boolean
}
const App: React.FC = () => {
  const [task, setTask] = useState<string>('')
  const [taskList, setTaskList] = useState<Task[]>([])

const handleAddTask = (task: string) => {

     if(task!==''){
      setTask(task);
      setTaskList(prev=>[...prev, {id:(prev.length+1),task:task,isDone:false}]);
       }
  
 // console.log('Event',e.target.form[0].value)//works with e: any only
  // const {task} = e.currentTarget.elements.item//.currentTarget.elements.input__text.value
  //     setTask(task)
  //     setTaskList(prev=>[...prev,{id:prev.length+1,task:task,isDone:false}])
}
  
  return (
    <div className="App">
   <span className='heading'> Task List</span>
   <InputField task={task}  handleAddTask={handleAddTask}/>
   {(task!=='' && taskList) && (
    <>
    {console.log(taskList)}
    {taskList.map((task)=>(
          <div className="task__list" key={task.id}>
            <p  className="task__list__id">{task.id}.   </p>
            <p  className="task__list__taskinfo">{task.task}</p>
            <p  className="task__list__isDone">{task.isDone}</p>
          </div>
    ))}
    </>
   )}
    </div>
  );
}

export default App;

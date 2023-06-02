import React, { useState, useRef,useEffect } from 'react';
import './App.css';
import InputField from './components/InputField';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import {IoMdCloudDone} from 'react-icons/io'
type Task = {
  id: number;
  task: string;
  isDone: boolean;
  isEdit:boolean;
};

const App: React.FC = () => {
  const [editedTaskInfo, setEditedTaskInfo] = useState<string>("")
  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  //to bring focus on the input field when edit clicked 
  //if we dont give <type> gives error that its possibly null
  const handleAddTask = (task: string) => {
    if (task !== '') {
      setTask(task);
      setTaskList((prev) => [
        ...prev,
        { id: prev.length + 1, task: task, isDone: false, isEdit:false },
      ]);
    }
  };
  const handleEditTask = (task:Task)=>{
    console.log('edit task',task)
    /** won't work as we r workign on a separate task, but already rendering part of this task is done
     * so we need to work on State variables to reflect render changes 
     * meaning need to do state update in tasklist
    setisEdit(true)
    task.isEdit= !task.isEdit
    */
    setEdit(!edit)
    setTaskList(prev=>{

     let newList = prev.map(item=>{
      if(item.id===task.id){
        return {...task,isEdit:!task.isEdit}
      }
      else return item

      })
      return [...newList]
    })
  
  }

  const handleDoneEditTask = (editedTask: Task)=>{
    setTaskList((prev) => {
      const newList = prev.map((item) => {
        if (item.id === editedTask.id) {
          editedTask.isEdit=false
           editedTask.task=editedTaskInfo;
           return editedTask
        }
        return item;
      });
      return newList;
    });
  }

  useEffect(()=>{
    inputRef.current?.focus();//if ? nto given will give error possibly null

  },[edit]);
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
              {
                task.isEdit?
                <input 
                ref={inputRef}
                name='task-edit' type='text' className='task-input-edit'
                onChange={(e) =>
                  setEditedTaskInfo(e.target.value)
                }
                />:
              task.isDone?
                //  {/**replace edit with done icon */}
               <s className="task__list__taskinfo">{task.task}</s>:
               <span className="task__list__taskinfo">{task.task}</span>
               //when using p tag it aligns the iconsa little above horizontal axis
               }
                <div className="icons">
                  <span className="icons__delete" onClick={()=>{
                      setTaskList((prev)=>{
                        let newList = prev.filter(item=>item.id!==task.id)
                        return [...newList]
                      })
                  }
                }>
                    <AiFillDelete />
                  </span>
                  
                 {
                 task.isEdit?
                 <span className="icons__edit" onClick={()=>{handleDoneEditTask(task)}}>
                  <IoMdCloudDone/>
                  </span>:
                  <span className="icons__edit" onClick={()=>{handleEditTask(task)}}>
                    <AiFillEdit />
                  </span>
                  }




                  <span className="icons__done">
                    <MdDone onClick={()=>{
                     setTaskList((prev)=>{
    /* order won't be preserved but striked item wil be added in the end
                      let newList = prev.filter(item=>item.id!==task.id)
                      prev = newList
                      return [...prev, {id:task.id,task:task.task,isDone:!task.isDone}]
     */
    /* using map will preserve the order
     */
                      const newList = prev.map(item=>{
                        if(item.id===task.id){
                          return {id:task.id,task:task.task,isDone:!task.isDone, isEdit:false} 
                          // add the current rendered item with isdone switched
                        }
                        return item //add the activvely looped items
                         })
    
                           return newList;
                         })
                     }}/>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;

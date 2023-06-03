import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import InputField from './components/InputField';
import ActiveTasksComponent from './components/ActiveTasksComponent';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

export type Task = {
  id: number;
  task: string;
  isDone: boolean;
  isEdit: boolean;
};

const App: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [completedTaskList, setCompletedTaskList] = useState<Task[]>([]);

  const handleAddTask = (task: string) => {
    if (task !== '') {
      setTask(task);
      setTaskList((prev) => [
        ...prev,
        { id: prev.length + 1, task: task, isDone: false, isEdit: false },
      ]);
    }
  };

  const handleEditTask = (task: Task) => {
    setTaskList((prev) => {
      let newList = prev.map((item) => {
        if (item.id === task.id) {
          return { ...item, isEdit: !item.isEdit };
        }
        return item;
      });
      return [...newList];
    });
  };

  const handleDoneEditTask = (editedTask: Task) => {
    setTaskList((prev) => {
      let newList = prev.map((item) => {
        if (item.id === editedTask.id) {
          return { ...item, isEdit: false, task: editedTask.task };
        }
        return item;
      });
      return [...newList];
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onDragEnd = (result:DropResult) =>{
    console.log(result)//for finding out parameters to use for logic
    const {source, destination} = result

    if(!destination) return;
    if(destination.droppableId===source.droppableId && destination.index===source.index)
      return

      let draggedTask,activeList=taskList, completeList=completedTaskList;

      if(source.droppableId==='active-task-list'){
        // check if source droppable id is activetasklist 
        draggedTask = activeList[source.index]
        activeList.splice(source.index,1)
        /*
         -pull the task out from active task list
        -splice the activetasklist from source.index for 1
        */
      }else{
        draggedTask = completeList[source.index]
        completeList.splice(source.index,1)
        /*
        pull the task out from complete task list
      - splice the completetasklist from source.index for 1
        */
      }
      if(destination.droppableId==='active-task-list'){
        activeList.splice(destination.index,0,draggedTask)
        //use splice to add the draggedTask at  destination.index by removing 0 elements at destinationindex
      }else{
        completeList.splice(destination.index,0,draggedTask)
       // use splice to add the draggedTask at  destination.index by removing 0 elements at destinationindex
      }

    setTaskList(activeList)
    setCompletedTaskList(completeList)
  }
  return (
    <div className="App">
      <span className="heading">Task List</span>
      <InputField task={task} handleAddTask={handleAddTask} />
      <div className="list-container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="active-task-list">
            {(provided, snapshot) => (
              <div
               className={`ActiveTasksList ${snapshot.isDraggingOver?'dragActive':''}`}
                ref={provided.innerRef
                } {...provided.droppableProps}>

                <span>Active Task List</span>
                <ActiveTasksComponent
                  task={task}
                  taskList={taskList}
                  handleEditTask={handleEditTask}
                  handleDoneEditTask={handleDoneEditTask}
                  setTaskList={setTaskList}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="completed-task-list">
            {(provided, snapshot) => (
              <div className={`CompletedTasksList ${snapshot.isDraggingOver?'dragComplete':''}`} ref={provided.innerRef} {...provided.droppableProps}>
                <span>Completed Task List</span>
                <ActiveTasksComponent
                  task={task}
                  taskList={completedTaskList}
                  handleEditTask={handleEditTask}
                  handleDoneEditTask={handleDoneEditTask}
                  setTaskList={setCompletedTaskList}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;

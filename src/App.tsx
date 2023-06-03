import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import InputField from './components/InputField';
import ActiveTasksComponent from './components/ActiveTasksComponent';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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

  return (
    <div className="App">
      <span className="heading">Task List</span>
      <InputField task={task} handleAddTask={handleAddTask} />
      <div className="list-container">
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="active-task-list">
            {(provided) => (
              <div className="ActiveTasksList" ref={provided.innerRef} {...provided.droppableProps}>
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
            {(provided) => (
              <div className="CompletedTasksList" ref={provided.innerRef} {...provided.droppableProps}>
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

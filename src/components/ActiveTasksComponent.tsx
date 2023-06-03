import React, { useRef, useState } from 'react';
import { Task } from '../App';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { IoMdCloudDone } from 'react-icons/io';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  task: string;
  taskList: Task[];
  handleEditTask: (task: Task) => void;
  handleDoneEditTask: (editedTask: Task) => void;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
};

const ActiveTasksComponent: React.FC<Props> = ({
  task,
  taskList,
  handleEditTask,
  handleDoneEditTask,
  setTaskList,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editedTaskInfo, setEditedTaskInfo] = useState<string>('');

  return (
    <>
      {task !== '' && taskList && (
        <>
          {taskList.map((task, index) => (
            <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
              {(provided) => (
                <div
                  className="task__list"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <p className="task__list__id">{task.id}</p>
                  <div className="task__list__content">
                    {task.isEdit ? (
                      <input
                        ref={inputRef}
                        name="task-edit"
                        type="text"
                        className="task-input-edit"
                        onChange={(e) => setEditedTaskInfo(e.target.value)}
                      />
                    ) : task.isDone ? (
                      <s className="task__list__taskinfo">{task.task}</s>
                    ) : (
                      <span className="task__list__taskinfo">{task.task}</span>
                    )}
                    <div className="icons">
                      <span
                        className="icons__delete"
                        onClick={() => {
                          setTaskList((prev) => {
                            let newList = prev.filter((item) => item.id !== task.id);
                            return [...newList];
                          });
                        }}
                      >
                        <AiFillDelete />
                      </span>

                      {task.isEdit ? (
                        <span
                          className="icons__edit"
                          onClick={() => {
                            handleDoneEditTask({...task, task:editedTaskInfo});
                          }}
                        >
                          <IoMdCloudDone />
                        </span>
                      ) : (
                        <span
                          className="icons__edit"
                          onClick={() => {
                            handleEditTask(task);
                          }}
                        >
                          <AiFillEdit />
                        </span>
                      )}

                      <span
                        className="icons__done"
                        onClick={() => {
                          setTaskList((prev) => {
                            const newList = prev.map((item) => {
                              if (item.id === task.id) {
                                return {
                                  id: task.id,
                                  task: task.task,
                                  isDone: !task.isDone,
                                  isEdit: false,
                                };
                              }
                              return item;
                            });
                            return newList;
                          });
                        }}
                      >
                        <MdDone />
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
        </>
      )}
    </>
  );
};

export default ActiveTasksComponent;

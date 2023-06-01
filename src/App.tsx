import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { log } from 'console';

const App: React.FC = () => {
  const [task, setTask] = useState<string>('')

  console.log(task,'added');
  
  return (
    <div className="App">
   <span className='heading'> Task List</span>
   <InputField task={task} callback={setTask}/>
    </div>
  );
}

export default App;

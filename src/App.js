import React from 'react';
import {  Routes,  Route } from 'react-router-dom';
import Tasks from "./components/Tasks.js"
import TaskDetail from './components/TaskDetail.js';
import TaskForm from './components/TaskForm.js';
import "./App.css"

const App = () => {
  return (
    <>
    
      <Routes>

        <Route exact path="/tasks" element={<Tasks/>}  />
        <Route exact path="/" element={<Tasks/>} />

        <Route exact path="/tasks/new" element={<TaskForm/>}  />
        <Route exact path="/tasks/:id" element={<TaskDetail/>}  />
        <Route exact path="/tasks/:id/edit" element={<TaskForm/>}  />
      
    </Routes>
    </>
  );
};

export default App;






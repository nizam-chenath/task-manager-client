import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/TaskList.css"

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://mernback-majh.onrender.com/tasks');
      setTasks(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mernback-majh.onrender.com/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

    <div className='task-list'>
      <h1 className='task-heading'>Tasks</h1>
      <div className='task-box'>
        { tasks ? tasks.map((task) => (
          <div key={task._id} className='task-item'>
            <div>

            <Link to={`/tasks/${task._id}`} className="task-title">{task.title}</Link>
            </div>
            <div>

            <p className='task-status'>{task.status == "pending" ? task.status : <span style={{color: "green"}}>{task.status}</span>}</p>
            </div>
            <div className="dlt-btn">

            <button className='btn-delete' onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </div>
        ))
    
        :
        <h3 style={{textAlign: "center"}}>Loading ...</h3>
    }
      </div>
      <div className='btn-section' >
        <button className='add-task-button' onClick={() => navigate("/tasks/new")}>Add New Task</button>
      
      </div>
    </div>
    </div>
  );
};

export default Tasks;
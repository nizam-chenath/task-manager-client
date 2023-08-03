import React, { useState, useEffect } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/TaskForm.css"
import { AiOutlineDoubleLeft } from 'react-icons/ai';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`https://mernback-majh.onrender.com/tasks/${id}`);
      const task = response.data;
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description, status };
 if(title == "" || description == ""){
        alert("please fill the form")
 }else{

     try {
       if (id) {
         await axios.put(`https://mernback-majh.onrender.com/tasks/${id}`, taskData);
       } else {
         await axios.post('https://mernback-majh.onrender.com/tasks', taskData);
       }
       navigate('/tasks');
     } catch (error) {
       console.error(error);
     }
 }
  };

  return (
    <div className='form-container'>
        <div className="form-box">
        <button className="back-btn" onClick={()=> navigate("/tasks")}><AiOutlineDoubleLeft/></button>
      <h2>{id ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">

        <div>
          <label>Title:</label><br />
          <input
          style={{width : "300px", height: "40px", border: "o.5px solid grey", borderRadius: "10px", fontSize: "16px" }}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea
          style={{width : "300px", height: "80px", border: "0.5px solid grey",borderRadius: "10px",  fontSize: "16px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{marginLeft: "10px", padding: "5px"}}>
            {id ?<>  
                <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            </> 
        :
        <option value="pending">Pending</option>
        }
            
          </select>
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
        </div>
      </form>
        </div>
    </div>
  );
};

export default TaskForm;
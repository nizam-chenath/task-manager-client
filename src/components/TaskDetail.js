import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/TaskDetail.css"
import {AiOutlineDoubleLeft} from "react-icons/ai"

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`https://mernback-majh.onrender.com/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='detail-container'>
        <button className="back-btn" onClick={()=> navigate("/tasks")}><AiOutlineDoubleLeft/></button>
        <div className="detail-box">

        <div className="title">

      <h2 style={{textAlign: "center"}}>{task.title}</h2>
        </div>
        <div className="description">

      <p>{task.description}</p>
        </div>
        <div className="status">

      <p>Status: {task.status}</p>
        </div>
        <div className="edit-btn">

      <button onClick={() => navigate(`/tasks/${id}/edit`)}>Edit</button>
        </div>
        </div>
    </div>
  );
};

export default TaskDetail;
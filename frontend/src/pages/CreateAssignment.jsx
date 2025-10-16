import React, { useState } from 'react';
import axios from '../api';
import { useParams, useNavigate } from 'react-router-dom';


export default function CreateAssignment({ user }){
const { courseId } = useParams();
const [title,setTitle]=useState('');
const [description,setDescription]=useState('');
const [dueDate,setDueDate]=useState('');
const nav = useNavigate();
if (!user || user.role !== 'teacher') return <div className="card">Teacher only</div>;
async function submit(e){
e.preventDefault();
try{ await axios.post(`/assignments/${courseId}`, { title, description, dueDate }); alert('created'); nav(`/courses/${courseId}`); }catch(e){ alert(e?.response?.data?.message || e.message); }
}
return (
<div className="card">
<h3>Create Assignment</h3>
<form onSubmit={submit}>
<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="title" />
<textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="description" />
<input value={dueDate} onChange={e=>setDueDate(e.target.value)} placeholder="due date (YYYY-MM-DD)" />
<button type="submit">Create</button>
</form>
</div>
)
}
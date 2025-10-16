import React, { useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';


export default function CreateCourse({ user }){
const [title,setTitle]=useState('');
const [description,setDescription]=useState('');
const [duration,setDuration]=useState('');
const nav = useNavigate();
async function submit(e){
e.preventDefault();
try{
await axios.post('/courses', { title, description, duration });
alert('created'); nav('/dashboard');
}catch(e){ alert(e?.response?.data?.message || e.message); }
}
if (!user || user.role !== 'teacher') return <div className="card">Teacher only</div>;
return (
<div className="card">
<h3>Create Course</h3>
<form onSubmit={submit}>
<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="title" />
<textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="description" />
<input value={duration} onChange={e=>setDuration(e.target.value)} placeholder="duration" />
<button type="submit">Create</button>
</form>
</div>
)
}
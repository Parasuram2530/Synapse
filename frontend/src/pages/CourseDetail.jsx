import React, { useEffect, useState } from 'react';
import axios from '../api';
import { useParams, Link, useNavigate } from 'react-router-dom';


export default function CourseDetail({ user }){
const { id } = useParams();
const [course,setCourse]=useState(null);
const [count,setCount]=useState(0);
const nav = useNavigate();
useEffect(()=>{ fetch(); }, []);
async function fetch(){ const res = await axios.get('/courses/' + id); setCourse(res.data.course); setCount(res.data.enrolledCount); }
async function enroll(){ try{ await axios.post(`/courses/${id}/enroll`); alert('enrolled'); }catch(e){ alert(e?.response?.data?.message || e.message); }}
return (
<div>
{course && (
<div className="card">
<h3>{course.title}</h3>
<p>{course.description}</p>
<p>Duration: {course.duration}</p>
<p>Teacher: {course.teacherId?.name}</p>
<p>Enrolled: {count}</p>
{user && user.role === 'student' && <button onClick={enroll}>Enroll</button>}
{user && user.role === 'teacher' && String(user.id) === String(course.teacherId?._id) && <Link to={`/create-assignment/${id}`}>Create Assignment</Link>}
</div>
)}
</div>
)
}
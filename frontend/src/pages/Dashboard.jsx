import React, { useEffect, useState } from 'react';
import axios from '../api';
import { Link } from 'react-router-dom';


export default function Dashboard({ user }){
const [myCourses, setMyCourses] = useState([]);
useEffect(()=>{ if(user && user.role==='teacher') fetchTeacher(); else fetchStudent(); }, [user]);
async function fetchTeacher(){
const all = await axios.get('/courses');
const mine = all.data.filter(c=> c.teacherId && c.teacherId._id === user.id);
setMyCourses(mine);
}
async function fetchStudent(){
const res = await axios.get('/courses');
setMyCourses([]);
}
return (
<div>
<h2>Dashboard</h2>
{user?.role === 'teacher' && <div><Link to="/create-course">Create Course</Link></div>}
<div>
{myCourses.map(c=> (
<div key={c._id} className="card">
<h4>{c.title}</h4>
<Link to={`/courses/${c._id}`}>Open</Link>
</div>
))}
</div>
</div>
)
}
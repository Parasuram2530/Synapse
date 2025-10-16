import React, { useEffect, useState } from 'react';
import axios from '../api';
import { Link } from 'react-router-dom';


export default function Courses(){
const [courses, setCourses] = useState([]);
useEffect(()=>{ fetch(); }, []);
async function fetch(){ const res = await axios.get('/courses'); setCourses(res.data); }
return (
<div>
<h2>Courses</h2>
{courses.map(c=> (
<div key={c._id} className="card">
<h4>{c.title}</h4>
<p>{c.description}</p>
<small>Teacher: {c.teacherId?.name}</small>
<div><Link to={`/courses/${c._id}`}>View</Link></div>
</div>
))}
</div>
)
}
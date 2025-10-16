import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Dashboard from './pages/Dashboard';
import CreateCourse from './pages/CreateCourse';
import CreateAssignment from './pages/CreateAssignment';
import SubmitAssignment from './pages/SubmitAssignment';
import { setToken } from './api';


export default function App(){
const [user, setUser] = useState(()=> JSON.parse(localStorage.getItem('user')) );
const navigate = useNavigate();
useEffect(()=>{ if(user) setToken(localStorage.getItem('token')); else setToken(null); }, [user]);
function logout(){ localStorage.removeItem('user'); localStorage.removeItem('token'); setUser(null); navigate('/'); }
return (
<div className="app">
<nav className="nav">
<Link to="/">Home</Link>
<Link to="/courses">Courses</Link>
{user ? <><Link to="/dashboard">Dashboard</Link><button onClick={logout}>Logout</button></> : <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}
</nav>
<main>
<Routes>
<Route path="/" element={<Courses user={user} />} />
<Route path="/login" element={<Login onLogin={u=>setUser(u)} />} />
<Route path="/register" element={<Register onRegister={u=>setUser(u)} />} />
<Route path="/courses" element={<Courses user={user} />} />
<Route path="/courses/:id" element={<CourseDetail user={user} />} />
<Route path="/dashboard" element={<Dashboard user={user} />} />
<Route path="/create-course" element={<CreateCourse user={user} />} />
<Route path="/create-assignment/:courseId" element={<CreateAssignment user={user} />} />
<Route path="/submit/:assignmentId" element={<SubmitAssignment user={user} />} />
</Routes>
</main>
</div>
)
}
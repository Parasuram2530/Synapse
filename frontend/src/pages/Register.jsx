import React, { useState } from 'react';
import api, { setToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToken(res.data.token); // correct instance usage
      onRegister && onRegister(res.data.user);
      nav('/dashboard');
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  }

  return (
    <div className="card">
      <h3>Register</h3>
      <form onSubmit={submit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="name" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

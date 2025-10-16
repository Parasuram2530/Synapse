import React, { useState } from 'react';
import api, { setToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToken(res.data.token); // <-- use instance helper
      onLogin && onLogin(res.data.user);
      nav('/dashboard');
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  }

  return (
    <div className="card">
      <h3>Login</h3>
      <form onSubmit={submit}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

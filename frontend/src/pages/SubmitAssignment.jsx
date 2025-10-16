import React, { useState } from 'react';
import axios from '../api';
import { useParams } from 'react-router-dom';


export default function SubmitAssignment({ user }){
const { assignmentId } = useParams();
const [text,setText] = useState('');
const [file, setFile] = useState(null);
if (!user || user.role !== 'student') return <div className="card">Student only</div>;
async function submit(e){
e.preventDefault();
try{
const form = new FormData();
form.append('text', text);
if (file) form.append('file', file);
const res = await axios.post(`/submissions/${assignmentId}/submit`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
alert('submitted');
}catch(e){ alert(e?.response?.data?.message || e.message); }
}
return (
<div className="card">
<h3>Submit Assignment</h3>
<form onSubmit={submit}>
<textarea value={text} onChange={e=>setText(e.target.value)} placeholder="optional text" />
<input type="file" onChange={e=>setFile(e.target.files[0])} />
<button type="submit">Submit</button>
</form>
</div>
)
}
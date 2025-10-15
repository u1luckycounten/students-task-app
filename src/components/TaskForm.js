import React, { useEffect, useState } from 'react';

const empty = { title: '', description: '', dueDate: '', status: 'Pending' };

export default function TaskForm({ initialData, onCreate, onUpdate, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (initialData && initialData._id) {
      const dueDate = initialData.dueDate ? new Date(initialData.dueDate).toISOString().slice(0,10) : '';
      setForm({ ...initialData, dueDate });
    } else if (initialData && Object.keys(initialData).length === 0) {
      setForm(empty);
    } else {
      setForm(empty);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.title) { alert('Title required'); return; }
    if (initialData && initialData._id) {
      await onUpdate(initialData._id, payload);
    } else {
      await onCreate(payload);
    }
    setForm(empty);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{initialData && initialData._id ? 'Edit Task' : 'Add Task'}</h2>
      <div>
        <label>Title</label>
        <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" value={form.dueDate} onChange={e=>setForm({...form, dueDate: e.target.value})} />
      </div>
      <div>
        <label>Status</label>
        <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit">{initialData && initialData._id ? 'Update' : 'Add'}</button>
        <button type="button" onClick={() => { setForm(empty); onCancel(); }}>Cancel</button>
      </div>
    </form>
  );
}
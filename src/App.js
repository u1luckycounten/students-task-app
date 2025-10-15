import React, { useEffect, useState } from 'react';
import API from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');

  const fetchTasks = async () => {
    try {
      const q = [];
      if (filterStatus) q.push(`status=${encodeURIComponent(filterStatus)}`);
      if (search) q.push(`search=${encodeURIComponent(search)}`);
      const query = q.length ? `?${q.join('&')}` : '';
      const res = await API.get(`/tasks${query}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filterStatus, search]);

  const handleCreate = async (taskData) => {
    await API.post('/tasks', taskData);
    setEditingTask(null);
    fetchTasks();
  };

  const handleUpdate = async (id, taskData) => {
    await API.put(`/tasks/${id}`, taskData);
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Student Daily Task Manager</h1>
      <div className="controls">
        <div>
          <label>Filter status:
            <select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
              <option value="">All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </label>
        </div>
        <div>
          <label>Search:
            <input placeholder="search title" value={search} onChange={(e)=>setSearch(e.target.value)} />
          </label>
        </div>
        <div>
          <button onClick={()=>{ setEditingTask({}); }}>Add New Task</button>
        </div>
      </div>
      <TaskForm
        key={editingTask ? editingTask._id || 'new' : 'form'}
        initialData={editingTask}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={() => setEditingTask(null)}
      />
      <TaskList
        tasks={tasks}
        onEdit={(task) => setEditingTask(task)}
        onDelete={handleDelete}
        onToggleStatus={async (task) => {
          const next = task.status === 'Completed' ? 'Pending' : 'Completed';
          await API.put(`/tasks/${task._id}`, { ...task, status: next });
          fetchTasks();
        }}
      />
    </div>
  );
}
export default App;
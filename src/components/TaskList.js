import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  if (!tasks.length) return <p>No tasks yet.</p>;
  return (
    <div className="task-list">
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Due</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <TaskItem key={t._id} task={t} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
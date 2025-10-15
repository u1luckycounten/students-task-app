import React from 'react';

export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  const due = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-';
  return (
    <tr>
      <td>
        <strong>{task.title}</strong>
        <div className="small">{task.description}</div>
      </td>
      <td>{due}</td>
      <td>{task.status}</td>
      <td>
        <button onClick={() => onToggleStatus(task)}>Toggle Complete</button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </td>
    </tr>
  );
}
import React from 'react';

const Task = ({ task, onEdit, onDelete, onToggleComplete }) => {
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high':
                return 'priority-high';
            case 'medium':
                return 'priority-medium';
            case 'low':
                return 'priority-low';
            default:
                return '';
        }
    };
    return (
        <div className={`task ${getPriorityClass(task.priority)} ${task.completed ? 'completed' : ''}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.due_date}</p>
            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
            <label>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task)}
                />
                {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
            </label>
        </div>
    );
};

export default Task;

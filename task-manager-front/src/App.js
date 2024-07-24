import React, { useState, useEffect } from 'react';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            setError('Failed to fetch tasks');
            console.error('Failed to fetch tasks:', error); // Log the error for debugging
        }
    };

    const showAlert = (message) => {
        setAlert(message);
        setTimeout(() => {
            setAlert(null);
        }, 3000); // Hide alert after 3 seconds
    };
    const handleCreateOrUpdate = async (task) => {
        try {
            if (task.id) {
                await updateTask(task.id, task);
                showAlert('Task updated successfully!');
            } else {
                await createTask(task);
                showAlert('Task created successfully!');
            }
            setCurrentTask(null); // Reset currentTask to null
            fetchTasks();
        } catch (error) {
            setError('Failed to save task');
        }
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            showAlert('Task deleted successfully!');
            fetchTasks();
        } catch (error) {
            setError('Failed to delete task');
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            await updateTask(task.id, updatedTask);
            fetchTasks();
        } catch (error) {
            setError('Failed to update task status');
        }
    };

    // Sorting function to prioritize tasks
    const sortTasksByPriority = (tasks) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    };

    const sortedTasks = sortTasksByPriority([...tasks]); // Sort tasks before rendering

    return (
        <div className="App">
            <h1>Task Manager</h1>
            {alert && <div className="alert">{alert}</div>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <TaskForm onSubmit={handleCreateOrUpdate} task={currentTask} />
            <div className="task-list">
                {sortedTasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleComplete={handleToggleComplete}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;

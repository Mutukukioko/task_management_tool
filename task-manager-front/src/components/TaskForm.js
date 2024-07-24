import React, { useState, useEffect } from 'react';


const TaskForm = ({ onSubmit, task }) => {
    const initialFormData = {
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
        completed: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (task) {
            setFormData(task);
        } else {
            setFormData(initialFormData); // Reset form when task is null
        }
    }, [task]);// eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData(initialFormData); // Reset form after submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className='heading'>Task Form: Plan Your Success</p>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default TaskForm;

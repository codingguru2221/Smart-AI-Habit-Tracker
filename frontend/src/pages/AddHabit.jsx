import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

const AddHabit = () => {
  const [habitData, setHabitData] = useState({
    name: '',
    description: '',
    category: 'technical',
    frequency: 'daily',
    targetCount: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHabitData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle habit submission
    console.log('Adding habit:', habitData);
  };

  return (
    <Layout>
      <div className="add-habit">
        <div className="page-header">
          <h1>Add New Habit</h1>
          <p>Create and customize your new habit</p>
        </div>
        
        <form className="habit-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Habit Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={habitData.name}
              onChange={handleInputChange}
              placeholder="Enter habit name"
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={habitData.description}
              onChange={handleInputChange}
              placeholder="Describe your habit"
              className="form-textarea"
              rows="3"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={habitData.category}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="technical">Technical</option>
                <option value="non-technical">Non-Technical</option>
                <option value="physical">Physical</option>
                <option value="non-physical">Non-Physical</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="frequency">Frequency</label>
              <select
                id="frequency"
                name="frequency"
                value={habitData.frequency}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="targetCount">Target Count</label>
              <input
                type="number"
                id="targetCount"
                name="targetCount"
                value={habitData.targetCount}
                onChange={handleInputChange}
                min="1"
                className="form-input"
              />
            </div>
          </div>
          
          <button type="submit" className="submit-btn">
            Add Habit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddHabit;
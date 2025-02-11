import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '@/config/config';
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';

interface Milestone {
  milestone: string;
  description: string;
  expectedCompletionDate: string;
  mentorFees: string;
}

const MilestoneForm: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([
    { milestone: '', description: '', expectedCompletionDate: '', mentorFees: '' },
  ]);
  useRedirectIfNotLoggedIn()


  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [name]: value };
    setMilestones(updatedMilestones);
  };

  const addMilestoneRow = () => {
    setMilestones([...milestones, { milestone: '', description: '', expectedCompletionDate: '', mentorFees: '' }]);
  };

  const removeMilestoneRow = (index: number) => {
    const updatedMilestones = milestones.filter((_, i) => i !== index);
    setMilestones(updatedMilestones);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Make sure token exists before proceeding
    if (!token) {
      console.error('Token not found!');
      return;
    }

    const data = {
      user_id: 1, // Replace with dynamic user ID if needed
      mentor_id: 1, // Replace with dynamic mentor ID if needed
      milestone: milestones, // The milestone data you want to send
    };

    try {
      // Make the POST request to the backend with the token in Authorization header
      const response = await axios.post(
        `${baseURL}/milestone`, // Replace with your backend URL
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response:', response.data);
      alert('Milestones stored successfully!');
    } catch (error) {
      console.error('Error storing milestones:', error);
      alert('Failed to store milestones.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Milestone Form</h1>

      {milestones.map((milestone, index) => (
        <div key={index} className="border border-gray-200 p-6 mb-6 rounded-lg bg-gray-50 shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Milestone {index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Milestone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Milestone</label>
              <input
                type="text"
                name="milestone"
                value={milestone.milestone}
                onChange={(e) => handleInputChange(index, e)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={milestone.description}
                onChange={(e) => handleInputChange(index, e)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Expected Completion Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Expected Completion Date</label>
              <input
                type="date"
                name="expectedCompletionDate"
                value={milestone.expectedCompletionDate}
                onChange={(e) => handleInputChange(index, e)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Mentor Fees Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Mentor Fees</label>
              <input
                type="number"
                name="mentorFees"
                value={milestone.mentorFees}
                onChange={(e) => handleInputChange(index, e)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Remove Milestone Button */}
          {milestones.length > 1 && (
            <button
              type="button"
              onClick={() => removeMilestoneRow(index)}
              className="mt-4 text-red-600 hover:text-red-800 text-sm font-semibold"
            >
              Remove Milestone
            </button>
          )}
        </div>
      ))}

      {/* Add Milestone Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={addMilestoneRow}
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 shadow-md"
        >
          Add Milestone
        </button>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="py-2 px-6 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 shadow-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MilestoneForm;

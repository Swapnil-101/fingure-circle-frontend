import React, { useState } from 'react';
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';
import baseURL from '@/config/config';
import axios from 'axios';

const FeedBackForm: React.FC = () => {
  // const [memberName, setMemberName] = useState('');
  // const [userName, setUserName] = useState('');
  const [milestone, setMilestone] = useState('');
  const [milestoneAchieved, setMilestoneAchieved] = useState<'yes' | 'no' | ''>('');
  const [nextStepsIdentified, setNextStepsIdentified] = useState<'yes' | 'no' | ''>('');
  const [progressRating, setProgressRating] = useState<number>(0);
  const [mentorResponsibility, setMentorResponsibility] = useState<'yes' | 'no' | ''>('');
  const [userResponsibility, setUserResponsibility] = useState<'yes' | 'no' | ''>('');
  const [confirm, setConfirm] = useState(false);

  const handleConfirm = () => {
    setConfirm(true);
  };
  useRedirectIfNotLoggedIn()


  const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found!');
      return;
    }

    const formData = {
      user_id: 1,
      mentor_id: 2,
      milestone,
      milestone_achieved: milestoneAchieved.toLowerCase() === 'yes',
      next_steps_identified: nextStepsIdentified.toLowerCase() === 'yes',
      progress_rating:progressRating,
      mentor_responsibility: mentorResponsibility.toLowerCase() === 'yes',
      user_responsibility: userResponsibility.toLowerCase() === 'yes',
    };

    const response = await axios.post(`${baseURL}/feedback`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log(response.data);
  } catch (err) {
    console.error('Error submitting feedback:', err);
  }
};



  const handleMakeChanges = () => {
    setConfirm(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Feedback Form</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Meeting Details</h3>
        {/* <div className="mb-4">
          <label className="block font-medium mb-2">Member Name:</label>
          <input
            type="text"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter member name"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter user name"
          />
        </div> */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Milestone:</label>
          <input
            type="text"
            value={milestone}
            onChange={(e) => setMilestone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter milestone"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Milestone Confirmation</h3>
        <p className="mb-2">Was the milestone discussed in this meeting achieved?</p>
        <div className="flex items-center space-x-4 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="yes"
              checked={milestoneAchieved === 'yes'}
              onChange={() => setMilestoneAchieved('yes')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="no"
              checked={milestoneAchieved === 'no'}
              onChange={() => setMilestoneAchieved('no')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Next Steps for this Milestone</h3>
        <p className="mb-2">New action items or next steps identified for the next meeting?</p>
        <div className="flex items-center space-x-4 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="yes"
              checked={nextStepsIdentified === 'yes'}
              onChange={() => setNextStepsIdentified('yes')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Yes, new steps identified</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="no"
              checked={nextStepsIdentified === 'no'}
              onChange={() => setNextStepsIdentified('no')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">No, this milestone needs further work</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Meeting Progress</h3>
        <label className="block font-medium mb-2">Rate progress towards goal (1 to 5):</label>
        <input
          type="number"
          min={1}
          max={5}
          value={progressRating}
          onChange={(e) => setProgressRating(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Accountability</h3>
        <p className="mb-2">Did the mentor fulfill their responsibility?</p>
        <div className="flex items-center space-x-4 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="yes"
              checked={mentorResponsibility === 'yes'}
              onChange={() => setMentorResponsibility('yes')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="no"
              checked={mentorResponsibility === 'no'}
              onChange={() => setMentorResponsibility('no')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">No</span>
          </label>
        </div>

        <p className="mb-2">Did the user fulfill their responsibility?</p>
        <div className="flex items-center space-x-4 mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="yes"
              checked={userResponsibility === 'yes'}
              onChange={() => setUserResponsibility('yes')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="no"
              checked={userResponsibility === 'no'}
              onChange={() => setUserResponsibility('no')}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div className="mb-6 text-center">
        <button
          onClick={handleConfirm}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>

      {confirm && (
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mr-4"
          >
            Submit
          </button>
          <button
            onClick={handleMakeChanges}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Make Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedBackForm;

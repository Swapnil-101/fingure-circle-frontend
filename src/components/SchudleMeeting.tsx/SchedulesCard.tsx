import React, { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "@/config/config";

const SchedulesCard = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setuserId] = useState("4");


  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/api/schedules`, {
          params: { user_id: userId },
        });
        setSchedules(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch schedules. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSchedules();
    }
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading schedules...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800">{schedule.name}</h2>
          <p className="text-sm text-gray-500">{schedule.email}</p>
          <div className="mt-4">
            <p className="text-sm">
              <strong>Start:</strong> {new Date(schedule.start_datetime).toLocaleString()}
            </p>
            <p className="text-sm">
              <strong>End:</strong> {new Date(schedule.end_datetime).toLocaleString()}
            </p>
          </div>
          {schedule.link && (
            <a
              href={schedule.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block"
            >
              Meeting Link
            </a>
          )}
          <div className="mt-4">
            <p className="text-sm">
              <strong>Mentor:</strong> {schedule.mentor_name} ({schedule.mentor_email})
            </p>
            <p className="text-sm">
              <strong>User ID:</strong> {schedule.user_id}
            </p>
            <p className="text-sm">
              <strong>Mentor ID:</strong> {schedule.mentor_id}
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Created at: {new Date(schedule.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SchedulesCard;

'use client';

import { useState, useEffect } from 'react';

export default function UserDashboardPage() {
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('Present');
  const [attendanceList, setAttendanceList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchAttendance() {
      const res = await fetch('/api/attendance', { method: 'GET' });
      const data = await res.json();
      setAttendanceList(data);
    }
    fetchAttendance();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, userId, status }),
    });

    const result = await res.json();
    setMessage(result.message);

    // Refresh attendance list
    const updated = await fetch('/api/attendance');
    const updatedData = await updated.json();
    setAttendanceList(updatedData);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="User ID (ObjectId)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      <h2 className="text-xl font-semibold mb-2">Attendance Records</h2>
      <ul className="space-y-2">
        {attendanceList.map((record) => (
          <li key={record._id} className="border p-2 rounded">
            <strong>Date:</strong> {record.date} | <strong>User:</strong> {record.userId} | <strong>Status:</strong> {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

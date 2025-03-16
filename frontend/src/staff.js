import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  // Function to fetch staff data from Spring Boot API
  const loadStaff = async () => {
    try {
      const response = await axios.get('http://localhost:8080/staff');
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
      alert('Failed to fetch staff.');
    }
  };

  return (
    <div>
      <h1>Staff Management</h1>
      <button onClick={loadStaff}>Load Staff</button>
      <button onClick={() => navigate('/staff-hire')}>Hire Staff</button>

      <div>
        {staffList.length > 0 ? (
          <ul>
            {staffList.map((staff) => (
              <li key={staff.staffno}>
                {staff.staffno} - {staff.fname} {staff.lname} ({staff.position})
              </li>
            ))}
          </ul>
        ) : (
          <p>No staff loaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Staff;

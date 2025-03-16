import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './StaffList.css'; // Import CSS styles

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  // Fetch staff data from Spring Boot API
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
        console.log('Fetching staff data...');
        const response = await axios.get('http://localhost:8080/staff');

        console.log('API Response:', response.data); // Log API response

        if (!Array.isArray(response.data)) {
            throw new Error('Invalid API response: Expected an array');
        }

        // ✅ Normalize API response to match UI expectation
        const formattedStaff = response.data.map(member => ({
            staffno: member.staffno || "N/A",
            fname: member.fname || "N/A",
            lname: member.lname || "N/A",
            position: member.position || "N/A",
            branchno: member.branchno || "N/A",
            dob: member.dob ? new Date(member.dob).toLocaleDateString() : "N/A",
            salary: member.salary ? member.salary.toLocaleString() : "N/A",
            telephone: member.telephone || "N/A",
            mobile: member.mobile || "N/A",
            email: member.email || "N/A",
            sex: member.sex || "N/A"
        }));

        setStaff(formattedStaff);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching staff data:', error.response?.data || error.message);
        setError('Failed to fetch staff data. Check console for details.');
        setLoading(false);
    }
};

  const handleEdit = (staffId) => {
    navigate(`/edit-staff/${staffId}`);
  };

  const handleDelete = async (staffId) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;

    try {
      await axios.delete(`http://localhost:8080/staff/${staffId}`);
      setStaff((prevStaff) => prevStaff.filter((member) => member.staffno !== staffId));
      alert('Staff member deleted successfully.');
    } catch (error) {
      console.error('Error deleting staff:', error);
      alert('Failed to delete staff member.');
    }
  };

  if (loading) return <div className="loading">Loading staff data...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="staff-container">
      <h1>Staff List</h1>
      <Link to="/staff/hire">
        <button className="hire-button">+ Hire New Staff</button>
      </Link>

      {staff.length === 0 ? (
        <p>No staff members found.</p>
      ) : (
        <table className="staff-table">
          <thead>
            <tr>
              <th>Staff No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Branch No</th>
              <th>DOB</th>
              <th>Salary</th>
              <th>Telephone</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Sex</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
        {staff.map((member, index) => (
        <tr key={member.staffno} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{member.staffno}</td>
            <td>{member.fname}</td>
            <td>{member.lname}</td>
            <td>{member.position}</td>
            <td>{member.branchno}</td>
            <td>{member.dob}</td> {/* ✅ Date formatting handled above */}
            <td>${member.salary}</td> {/* ✅ Salary formatting handled above */}
            <td>{member.telephone}</td>
            <td>{member.mobile}</td>
            <td>{member.email}</td>
            <td>{member.sex}</td>
            <td>
                <button className="edit-btn" onClick={() => handleEdit(member.staffno)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(member.staffno)}>Delete</button>
            </td>
        </tr>
    ))}
</tbody>
        </table>
      )}
    </div>
  );
};

export default StaffList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './StaffList.css';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:8080/staff');
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
      console.error('Error fetching staff data:', error);
      setError('Failed to fetch staff data.');
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
      setStaff((prevStaff) => prevStaff.filter((m) => m.staffno !== staffId));
      alert('Staff member deleted successfully.');
    } catch (error) {
      console.error('Error deleting staff:', error);
      alert('Failed to delete staff member.');
    }
  };

  const filteredStaff = staff.filter((member) =>
    member.staffno.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.lname.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const paginatedStaff = filteredStaff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  return (
    <div className="staff-container">
      <h1>Staff List</h1>
      <Link to="/staff/hire">
        <button className="hire-button">+ Hire New Staff</button>
      </Link>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Staff No, First Name, or Last Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Loading staff data...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <table className="staff-table">
            <thead>
              <tr>
                <th>Staff No</th><th>First Name</th><th>Last Name</th><th>Position</th>
                <th>Branch No</th><th>DOB</th><th>Salary</th><th>Telephone</th>
                <th>Mobile</th><th>Email</th><th>Sex</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStaff.map((member, index) => (
                <tr key={member.staffno} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{member.staffno}</td>
                  <td>{member.fname}</td>
                  <td>{member.lname}</td>
                  <td>{member.position}</td>
                  <td>{member.branchno}</td>
                  <td>{member.dob}</td>
                  <td>${member.salary}</td>
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

          {/* Pagination Controls */}
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default StaffList;

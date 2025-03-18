import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./EditStaff.css";


const EditStaff = () => {
  const { staffId } = useParams(); // Get staffId from URL
  const navigate = useNavigate();
  
  const [staffDetails, setStaffDetails] = useState({
    staffno: "",
    fname: "",
    lname: "",
    position: "",
    branchno: "",
    dob: "",
    salary: "",
    telephone: "",
    email: "",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // To show loading state
  
  // Fetch staff details based on staffId
  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/staff/${staffId}`);
        setStaffDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching staff details:', error);
        alert('Failed to fetch staff details.');
        setLoading(false);
      }
    };
    fetchStaffDetails();
  }, [staffId]);

  // Validation function
  const validateField = (name, value) => {
    let error = "";
    if (name === "salary" && value <= 0) {
      error = "Salary must be a positive number.";
    } else if (name === "telephone" && !/^\d+$/.test(value)) {
      error = "Only numbers are allowed.";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email format.";
    }
    return error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffDetails({ ...staffDetails, [name]: value });

    // Validate field and update errors
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const newErrors = {};
    ["salary", "telephone", "email"].forEach((field) => {
      const error = validateField(field, staffDetails[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/staff/${staffId}`, {
        salary: staffDetails.salary,
        telephone: staffDetails.telephone,
        email: staffDetails.email,
      });

      if (response.status === 200) {
        alert("Staff details updated successfully.");
        navigate(`/`); // Redirect back to staff list
      }
    } catch (error) {
      console.error('Error updating staff:', error);
      alert('Failed to update staff details.');
    }
  };

  return (
    <div className="edit-staff-container">
      <h2>Edit Staff Details</h2>

      {loading ? (
        <p>Loading staff details...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Non-editable fields */}
          <div className="form-group">
            <label>Staff No:</label>
            <input type="text" value={staffDetails.staffno} disabled />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" value={staffDetails.fname} disabled />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" value={staffDetails.lname} disabled />
          </div>
          <div className="form-group">
            <label>Position:</label>
            <input type="text" value={staffDetails.position} disabled />
          </div>
          <div className="form-group">
            <label>Branch No:</label>
            <input type="text" value={staffDetails.branchno} disabled />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input type="text" value={staffDetails.dob} disabled />
          </div>

          {/* Editable fields */}
          <div className="form-group">
            <label>Salary:</label>
            <input
              type="number"
              name="salary"
              value={staffDetails.salary}
              onChange={handleChange}
              required
            />
            {errors.salary && <span style={{ color: "red" }}>{errors.salary}</span>}
          </div>

          <div className="form-group">
            <label>Telephone:</label>
            <input
              type="text"
              name="telephone"
              value={staffDetails.telephone}
              onChange={handleChange}
              required
            />
            {errors.telephone && <span style={{ color: "red" }}>{errors.telephone}</span>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={staffDetails.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
          </div>

          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditStaff;

import React, { useState } from 'react';
import axios from 'axios';
import './StaffHiringForm.css'; // Import the CSS file

const StaffHiringForm = () => {
  const [formData, setFormData] = useState({
    FNAME: '',
    LNAME: '',
    POSITION: '',
    BRANCHNO: '',
    DOB: '',
    SALARY: '',
    TELEPHONE: '',
    MOBILE: '',
    EMAIL: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name.toUpperCase()]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submission:", formData); // Log form data for debugging
    try {
      const response = await axios.post('http://localhost:3001/api/hire-staff', formData);
      alert(response.data.message);
      
      // Reset the form after submission
      setFormData({
        FNAME: '',
        LNAME: '',
        POSITION: '',
        BRANCHNO: '',
        DOB: '',
        SALARY: '',
        TELEPHONE: '',
        MOBILE: '',
        EMAIL: ''
      });
    } catch (error) {
      console.error("Error hiring staff:", error);
      alert("There was an error submitting the form."); // Alert on error
    }
  };

  const handleCancel = () => {
    // Reset form data on cancel
    setFormData({
      FNAME: '',
      LNAME: '',
      POSITION: '',
      BRANCHNO: '',
      DOB: '',
      SALARY: '',
      TELEPHONE: '',
      MOBILE: '',
      EMAIL: ''
    });
  };

  return (
    <div className="form-container">
      <h1>Staff Hiring Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="FNAME"
            value={formData.FNAME}
            onChange={handleChange}
            required // Make this field required
          />
        </div>
        <div className="form-row">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="LNAME"
            value={formData.LNAME}
            onChange={handleChange}
            required // Make this field required
          />
        </div>
        <div className="form-row">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            name="POSITION"
            value={formData.POSITION}
            onChange={handleChange}
            required // Make this field required
          />
        </div>
        <div className="form-row">
          <label htmlFor="branchNo">Branch No:</label>
          <input
            type="text"
            id="branchNo"
            name="BRANCHNO"
            value={formData.BRANCHNO}
            onChange={handleChange}
            required // Make this field required
          />
        </div>
        <div className="form-row">
          <label htmlFor="dob">DOB:</label>
          <input
            type="date"
            id="dob"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            required // Make this field required
          />
        </div>
        <div className="form-row">
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            name="SALARY"
            value={formData.SALARY}
            onChange={handleChange}
            required // Make this field required
          />
        </div>
        <div className="form-row">
          <label htmlFor="telephone">Telephone:</label>
          <input
            type="tel"
            id="telephone"
            name="TELEPHONE"
            value={formData.TELEPHONE}
            onChange={handleChange}
            required // Make this field required
          />
        </div>
        <div className="form-row">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="tel"
            id="mobile"
            name="MOBILE"
            value={formData.MOBILE}
            onChange={handleChange}
            required // Make this field required
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="EMAIL"
            value={formData.EMAIL}
            onChange={handleChange}
            required // Make this field required
          />
        </div>

        <div className="button-container">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="hire-button">
            Hire
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffHiringForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StaffHiringForm.css"; // Import styles

const StaffHiringForm = () => {
  const [staffData, setStaffData] = useState({
    staffno: "",
    firstName: "",
    lastName: "",
    position: "",
    branchno: "",
    dob: "",
    salary: "",
    telephone: "",
    mobile: "",
    email: "",
    sex: "",
  });

  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(true);

  // Fetch branches from API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:8080/branch");
        if (response.data.length > 0) {
          setBranches(response.data);
        } else {
          alert("No branches found in system! Contact administrator.");
        }
      } catch (error) {
        alert(`Error loading branches: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoadingBranches(false);
      }
    };
    fetchBranches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData({ ...staffData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        staffno: staffData.staffno,
        fname: staffData.firstName,
        lname: staffData.lastName,
        position: staffData.position,
        branchno: staffData.branchno,
        dob: staffData.dob,
        salary: staffData.salary,
        telephone: staffData.telephone,
        mobile: staffData.mobile,
        email: staffData.email,
        sex: staffData.sex,
      };

      const response = await axios.post("http://localhost:8080/staff/hire", dataToSend);

      if (response.data.success) {
        alert("Success: " + response.data.message);
        setStaffData({
          staffno: "",
          firstName: "",
          lastName: "",
          position: "",
          branchno: "",
          dob: "",
          salary: "",
          telephone: "",
          mobile: "",
          email: "",
          sex: "",
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Error: ${errorMessage}`);
      console.error("Hiring Error:", error);
    }
  };

  return (
    <div className="staff-hiring-container">
      <h2>Hire New Staff</h2>
      <form onSubmit={handleSubmit} className="staff-form">
        <div className="form-group">
          <label>Staff Number:</label>
          <input name="staffno" value={staffData.staffno} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>First Name:</label>
          <input name="firstName" value={staffData.firstName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input name="lastName" value={staffData.lastName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Position:</label>
          <input name="position" value={staffData.position} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Branch:</label>
          <select name="branchno" value={staffData.branchno} onChange={handleChange} required disabled={loadingBranches}>
            <option value="">{loadingBranches ? "Loading branches..." : "Select Branch"}</option>
            {branches.map((branch) => (
              <option key={branch.branchNo} value={branch.branchNo}>
                {branch.branchNo} - {branch.street}, {branch.city}, {branch.postcode}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input name="dob" type="date" value={staffData.dob} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Salary:</label>
          <input name="salary" type="number" value={staffData.salary} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Telephone:</label>
          <input name="telephone" value={staffData.telephone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Mobile:</label>
          <input name="mobile" value={staffData.mobile} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input name="email" type="email" value={staffData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="sex" value={staffData.sex} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Hire Staff</button>
      </form>
    </div>
  );
};

export default StaffHiringForm;

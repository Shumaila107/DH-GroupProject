import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StaffHiringForm.css";

const StaffHiringForm = () => {
  const [staffData, setStaffData] = useState({
    staffno: "",
    fname: "",
    lname: "",
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
  const [errors, setErrors] = useState({});

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

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "staffno":
        if (!/^[a-zA-Z0-9]+$/.test(value)) error = "Staff number must be alphanumeric.";
        break;
      case "fname":
      case "lname":
        if (!/^[a-zA-Z]+$/.test(value)) error = "Only alphabets are allowed.";
        break;
      case "dob":
        if (new Date(value) >= new Date()) error = "Date of birth must be in the past.";
        break;
      case "salary":
        if (value <= 0) error = "Salary must be a positive number.";
        break;
      case "telephone":
      case "mobile":
        if (!/^\d+$/.test(value)) error = "Only numbers are allowed.";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format.";
        break;
      case "sex":
        if (!value) error = "Gender selection is required.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData({ ...staffData, [name]: value });

    // Validate field in real-time
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {};
    Object.keys(staffData).forEach((key) => {
      const error = validateField(key, staffData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/staff/hire", staffData);

      if (response.data.success) {
        alert("Success: " + response.data.message);
        setStaffData({
          staffno: "",
          fname: "",
          lname: "",
          position: "",
          branchno: "",
          dob: "",
          salary: "",
          telephone: "",
          mobile: "",
          email: "",
          sex: "",
        });
        setErrors({});
      }
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
      console.error("Hiring Error:", error);
    }
  };

  return (
    <div className="staff-hiring-container">
      <h2>Hire New Staff</h2>
      <form onSubmit={handleSubmit} className="staff-form">
        {[
          { label: "Staff Number", name: "staffno" },
          { label: "First Name", name: "fname" },
          { label: "Last Name", name: "lname" },
          { label: "Position", name: "position" },
        ].map(({ label, name }) => (
          <div className="form-group" key={name}>
            <label>{label}:</label>
            <input name={name} value={staffData[name]} onChange={handleChange} required />
            {errors[name] && <span style={{ color: "red", fontSize: "14px", marginTop: "5px", fontWeight: "bold" }}>{errors[name]}</span>}
          </div>
        ))}

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
          {errors.branchno && <span style={{ color: "red", fontSize: "14px", marginTop: "5px", fontWeight: "bold" }}>{errors.branchno}</span>}
        </div>

        {[
          { label: "Date of Birth", name: "dob", type: "date" },
          { label: "Salary", name: "salary", type: "number" },
          { label: "Telephone", name: "telephone" },
          { label: "Mobile", name: "mobile" },
          { label: "Email", name: "email", type: "email" },
        ].map(({ label, name, type = "text" }) => (
          <div className="form-group" key={name}>
            <label>{label}:</label>
            <input name={name} type={type} value={staffData[name]} onChange={handleChange} required />
            {errors[name] && <span style={{ color: "red", fontSize: "14px", marginTop: "5px", fontWeight: "bold" }}>{errors[name]}</span>}
          </div>
        ))}

        <div className="form-group">
          <label>Gender:</label>
          <select name="sex" value={staffData.sex} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          {errors.sex && <span style={{ color: "red", fontSize: "14px", marginTop: "5px", fontWeight: "bold" }}>{errors.sex}</span>}
        </div>

        <button type="submit" className="submit-btn">Hire Staff</button>
      </form>
    </div>
  );
};

export default StaffHiringForm;

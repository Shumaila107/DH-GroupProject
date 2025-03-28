import React, { useState } from "react";
import axios from "axios";
import "./BranchAddingForm.css";

const BranchAddingForm = () => {
  const [branchData, setBranchData] = useState({
    branchNo: "",
    street: "",
    city: "",
    postcode: ""
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "branchNo":
        if (!/^B\d{3}$/.test(value)) error = "Branch number must be in the format B followed by 3 digits.";
        break;
      case "street":
        if (!value.trim()) error = "Street cannot be empty.";
        break;
      case "city":
        if (!/^[a-zA-Z\s]+$/.test(value)) error = "City should contain only alphabets and spaces.";
        break;
      case "postcode":
        if (!/^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/.test(value)) error = "Invalid UK postcode format.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranchData({ ...branchData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(branchData).forEach((key) => {
      const error = validateField(key, branchData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/branch/add-branch", branchData);
      if (response.data) {
        alert("Branch added successfully!");
        setBranchData({
          branchNo: "",
          street: "",
          city: "",
          postcode: ""
        });
        setErrors({});
      }
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="branch-adding-container">
      <h2>Open New Branch</h2>
      <form onSubmit={handleSubmit} className="branch-form">
        {["branchNo", "street", "city", "postcode"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              name={field}
              value={branchData[field]}
              onChange={handleChange}
              required
            />
            {errors[field] && <span className="error-message">{errors[field]}</span>}
          </div>
        ))}

        <button type="submit" className="submit-btn">Add Branch</button>
      </form>
    </div>
  );
};

export default BranchAddingForm;

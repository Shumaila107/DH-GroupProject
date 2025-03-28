import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./EditBranch.css";

const EditBranch = () => {
  const { branchNo } = useParams(); // Get branchNo from URL
  const navigate = useNavigate();
  
  const [branchDetails, setBranchDetails] = useState({
    branchNo: "",
    street: "",
    city: "",
    postcode: "",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Fetch branch details based on branchNo
  useEffect(() => {
    const fetchBranchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/branch?branchNo=${branchNo}`);
        setBranchDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching branch details:', error);
        alert('Failed to fetch branch details.');
        setLoading(false);
      }
    };
    fetchBranchDetails();
  }, [branchNo]);

  // Validation function
  const validateField = (name, value) => {
    let error = "";
    if (name === "postcode" && !/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/.test(value)) {
      error = "Invalid UK postcode format.";
    }
    return error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranchDetails({ ...branchDetails, [name]: value });

    // Validate field and update errors
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const newErrors = {};
    Object.keys(branchDetails).forEach((field) => {
      const error = validateField(field, branchDetails[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/branch/${branchNo}`, branchDetails);

      if (response.status === 200) {
        alert("Branch details updated successfully.");
        navigate(`/branch`); // Redirect back to branch list
      }
    } catch (error) {
      console.error('Error updating branch:', error);
      alert('Failed to update branch details.');
    }
  };

  return (
    <div className="edit-branch-container">
      <h2>Edit Branch Details</h2>

      {loading ? (
        <p>Loading branch details...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Branch No:</label>
            <input type="text" value={branchDetails.branchNo} disabled />
          </div>
          <div className="form-group">
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={branchDetails.street}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={branchDetails.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Postcode:</label>
            <input
              type="text"
              name="postcode"
              value={branchDetails.postcode}
              onChange={handleChange}
              required
            />
            {errors.postcode && <span className="error">{errors.postcode}</span>}
          </div>

          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditBranch;

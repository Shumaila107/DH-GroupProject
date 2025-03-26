// EditBranch.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditBranch.css'; // Create CSS file for styling

function EditBranch() {
  const [branchNo, setBranchNo] = useState('');
  const [branchDetails, setBranchDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch branch details when branchNo changes
  useEffect(() => {
    const fetchBranchDetails = async () => {
      if (branchNo) {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get(`/api/branches/${branchNo}`); //Backend API call
          setBranchDetails(response.data);
        } catch (err) {
          setError('Error fetching branch details.');
          console.error(err);
          setBranchDetails(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBranchDetails();
  }, [branchNo]);

  // Handle input changes for branch details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBranchDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  // Handle update submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await axios.put(`/api/branches/${branchNo}`, branchDetails); //Backend API call
      alert('Branch details updated successfully!');
    } catch (err) {
      setError('Error updating branch details.');
      console.error(err);
    }
  };

  return (
    <div className="edit-branch-container">
      <h2>Edit Branch Details</h2>
      {/* Input to enter Branch Number */}
      <div className="form-group">
        <label htmlFor="branchNo">Enter Branch Number:</label>
        <input
          type="text"
          id="branchNo"
          value={branchNo}
          onChange={(e) => setBranchNo(e.target.value)}
          required
        />
      </div>

      {loading && <p>Loading branch details...</p>}
      {error && <p className="error-message">{error}</p>}

      {branchDetails && (
        <form onSubmit={handleSubmit}>
          {/* Display all Branch Details as editable fields */}
          {Object.keys(branchDetails).map(key => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key}:</label>
              <input
                type="text"
                id={key}
                name={key}
                value={branchDetails[key] || ''}
                onChange={handleInputChange}
                disabled={key === 'branchNo'} // Disable editing of Branch Number
              />
            </div>
          ))}
          <button type="submit">Update Branch</button>
        </form>
      )}
    </div>
  );
}

export default EditBranch;


// BranchAddress.js
import React, { useState } from 'react';
import axios from 'axios';
import './BranchAddress.css'; // Create a CSS file for styling if needed

function BranchAddress() {
  const [branchNo, setBranchNo] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await axios.get(`/api/branches/address/${branchNo}`); //Backend API call
      setAddress(response.data.street + ', ' + response.data.city); // adjust with your backend data
    } catch (err) {
      setError('Error fetching branch address. Please check the Branch Number.');
      setAddress(''); // Clear previous address
      console.error(err); // Log the error for debugging
    }
  };

  return (
    <div className="branch-address-container">
      <h2>Identify Branch Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="branchNo">Branch Number:</label>
          <input
            type="text"
            id="branchNo"
            value={branchNo}
            onChange={(e) => setBranchNo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Address</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {address && (
        <div className="address-display">
          <h3>Branch Address:</h3>
          <p>{address}</p>
        </div>
      )}
    </div>
  );
}

export default BranchAddress;

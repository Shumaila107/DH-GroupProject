// OpenBranch.js
import React, { useState } from 'react';
import axios from 'axios';
import './OpenBranch.css'; // Create CSS file for styling

function OpenBranch() {
  const [branchNo, setBranchNo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post('/api/branches', {  //Backend API call
        branchNo: branchNo,
        street: street,
        city: city,
        postcode: postcode
      });

      setSuccessMessage('Branch opened successfully!');
      // Clear the form
      setBranchNo('');
      setStreet('');
      setCity('');
      setPostcode('');

    } catch (error) {
      setErrorMessage('Error opening branch. Please check the details.');
      console.error(error);
    }
  };

  return (
    <div className="open-branch-container">
      <h2>Open a New Branch</h2>
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
        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="postcode">Postcode:</label>
          <input
            type="text"
            id="postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Open Branch</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default OpenBranch;


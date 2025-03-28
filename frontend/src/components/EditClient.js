import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./EditClient.css";  // Make sure the CSS file name is correctly linked

const EditClient = () => {
  const { clientId } = useParams(); // Get clientId from URL
  const navigate = useNavigate();
  
  const [clientDetails, setClientDetails] = useState({
    clientno: "",
    fname: "",
    lname: "",
    telephone: "",
    email: "",
    address: "",
    preftype: ""
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // To show loading state
  
  // Fetch client details based on clientId
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/clients/${clientId}`);
        setClientDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching client details:', error);
        alert('Failed to fetch client details.');
        setLoading(false);
      }
    };
    fetchClientDetails();
  }, [clientId]);

  // Validation function
  const validateField = (name, value) => {
    let error = "";
    if (name === "telephone" && !/^\d+$/.test(value)) {
      error = "Only numbers are allowed.";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email format.";
    }
    return error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientDetails({ ...clientDetails, [name]: value });

    // Validate field and update errors
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const newErrors = {};
    ["telephone", "email"].forEach((field) => {
      const error = validateField(field, clientDetails[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/client/CR201`, {
        telephone: clientDetails.telephone,
        email: clientDetails.email,
        address: clientDetails.address,
        preftype: clientDetails.preftype
      });

      if (response.status === 200) {
        alert("Client details updated successfully.");
        navigate(`/clients`); // Redirect back to clients list
      }
    } catch (error) {
      console.error('Error updating client:', error);
      alert('Failed to update client details.');
    }
  };

  return (
    <div className="client-edit-container">
      <h2>Edit Client Details</h2>

      {loading ? (
        <p>Loading client details...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Non-editable fields */}
          <div className="form-group">
            <label>Client No:</label>
            <input type="text" value={clientDetails.clientno} disabled />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" value={clientDetails.fname} disabled />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" value={clientDetails.lname} disabled />
          </div>

          {/* Editable fields */}
          <div className="form-group">
            <label>Telephone:</label>
            <input
              type="text"
              name="telephone"
              value={clientDetails.telephone}
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
              value={clientDetails.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={clientDetails.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Preferred Type:</label>
            <select
              name="preftype"
              value={clientDetails.preftype}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="House">House</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Loft">Loft</option>
            </select>
          </div>

          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditClient;

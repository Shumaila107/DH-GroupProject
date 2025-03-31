import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./EditClient.css";

const EditClient = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [clientDetails, setClientDetails] = useState({
    clientno: "",
    fname: "",
    lname: "",
    telno: "",
    email: "",
    street: "",
    city: "",
    preftype: "",
    maxrent: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/client/${clientId}`);
        setClientDetails(response.data);
      } catch (error) {
        console.error("Error fetching client:", error);
        alert("Failed to fetch client details.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [clientId]);

  const validateField = (name, value) => {
    if (name === "telno" && !/^\d+$/.test(value)) {
      return "Telephone must contain only digits.";
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Invalid email format.";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setClientDetails(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    ["telno", "email"].forEach(field => {
      const err = validateField(field, clientDetails[field]);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fix validation errors.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/client/${clientId}`, clientDetails);
      alert("Client updated successfully.");
      navigate("/client");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update client.");
    }
  };

  return (
    <div className="client-edit-container">
      <h2>Edit Client Details</h2>

      {loading ? (
        <p>Loading client data...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Read-only fields */}
          <div className="form-group">
            <label>Client No:</label>
            <input type="text" value={clientDetails.clientNo} disabled />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" value={clientDetails.fname} disabled />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" value={clientDetails.lname} disabled />
          </div>

          {/* Editable Fields */}
          <div className="form-group">
            <label>Telephone:</label>
            <input type="text" name="telno" value={clientDetails.telno} onChange={handleChange} />
            {errors.telno && <span className="error">{errors.telno}</span>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="text" name="email" value={clientDetails.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Street:</label>
            <input type="text" name="street" value={clientDetails.street} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>City:</label>
            <input type="text" name="city" value={clientDetails.city} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Preferred Type:</label>
            <select name="preftype" value={clientDetails.preftype} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="House">House</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Loft">Loft</option>
            </select>
          </div>

          <div className="form-group">
            <label>Max Rent:</label>
            <input type="number" name="maxrent" value={clientDetails.maxrent} onChange={handleChange} />
          </div>

          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditClient;

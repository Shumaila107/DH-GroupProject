import React, { useState } from "react";
import axios from "axios";
import "./ClientAddingForm.css";

const ClientAddingForm = () => {
  const [clientData, setClientData] = useState({
    clientno: "",
    fname: "",
    lname: "",
    telephone: "",
    street: "",
    city: "",
    email: "",
    preftype: "",
    maxrent: ""
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "clientno":
        if (!/^[a-zA-Z0-9]+$/.test(value)) error = "Client number must be alphanumeric.";
        break;
      case "fname":
      case "lname":
        if (!/^[a-zA-Z]+$/.test(value)) error = "Only alphabets are allowed.";
        break;
      case "telephone":
        if (!/^[0-9-]+$/.test(value)) error = "Invalid telephone number.";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format.";
        break;
      case "preftype":
        if (!value) error = "Please select a preferred type.";
        break;
      case "maxrent":
        if (value <= 0 || isNaN(value)) error = "Max rent must be a positive number.";  // Validation for maxrent
        break;   
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(clientData).forEach((key) => {
      const error = validateField(key, clientData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/clients/add-client", clientData);
      if (response.data.success) {
        alert("Client added successfully!");
        setClientData({
          clientno: "CR201",
          fname: "Tony",
          lname: "Stark",
          telephone: "5556789",
          street: "10880 Malibu Point",
          city: "Malibu",
          email: "tony.stark@starkindustries.com",
          preftype: "House",
          maxrent: "1200"
        });
        setErrors({});
      }
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="client-adding-container">
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit} className="client-form">
        {["clientno", "first name", "last name", "telephone", "street", "city", "email"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.replace(/\b\w/g, (c) => c.toUpperCase())}:</label>
            <input
              name={field}
              value={clientData[field]}
              onChange={handleChange}
              required
            />
            {errors[field] && <span className="error-message">{errors[field]}</span>}
          </div>
        ))}

         {/* Max Rent field */}
         <div className="form-group">
          <label>Max Rent:</label>
          <input
            type="number"
            name="maxrent"
            value={clientData.maxrent}
            onChange={handleChange}
            required
            className={errors.maxrent ? "error" : ""}
          />
          {errors.maxrent && <span className="error-message">{errors.maxrent}</span>}
        </div>


       {/* Dropdown Menu */}
        <div className="form-group">
          <label>Preferred Type:</label>
          <select name="preftype" value={clientData.preftype} onChange={handleChange} required>
            <option value="">Select Preferred Type</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Loft">Loft</option>
          </select>
          {errors.preftype && <span className="error-message">{errors.preftype}</span>}
        </div>

        <button type="submit" className="submit-btn">Add Client</button>
      </form>
    </div>
  );
};

export default ClientAddingForm;

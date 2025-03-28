import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ClientList.css'; // Import CSS styles

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For Navigation

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true); // Show loading indicator during API call
    try {
      console.log('Fetching client data...');
      const response = await axios.get('http://localhost:8080/client');

      console.log('API Response:', response.data); // Log API response

      if (!Array.isArray(response.data)) {
        throw new Error('Invalid API response: Expected an array');
      }

      //Normalize API response to match UI experience
      const formattedClients = response.data.map(client => ({
        clientno: client.clientno || "N/A",
        fname: client.fname || "N/A",
        lname: client.lname || "N/A",
        telephone: client.telephone || "N/A",
        street: client.street || "N/A",
        city: client.city || "N/A",
        email: client.email || "N/A",
        preftype: client.preftype || "N/A",
        maxrent: client.maxrent ? `$${client.maxrent.toLocaleString()}` : "N/A"
      }));

      setClients(formattedClients);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching client data:', error.response?.data || error.message);
      setError('Failed to fetch client data. Showing mock data.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (clientId) => {
    navigate(`/edit-client/${clientId}`);
  };

  const handleDelete = async (clientId) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;

    try {
      await axios.delete(`http://localhost:8080/clients/CR201`);
      setClients((prevClients) => prevClients.filter((client) => client.clientno !== clientId));
      alert('Client deleted successfully.');
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Failed to delete client.');
    }
  };

  return (
    <div className="client-container">
      <h1>Client List</h1>
      <Link to="/clients/add">
        <button className="add-client-button">+ Add New Client</button>
      </Link>

      {loading ? (
        <div className="loading">Loading client data...</div>
      ) : (
        <>
          {error && <div className="error-message">{error}</div>}
          <table className="client-table">
            <thead>
              <tr>
                <th>Client No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Telephone</th>
                <th>Street</th>
                <th>City</th>
                <th>Email</th>
                <th>Preferred Type</th>
                <th>Max Rent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={client.clientno} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{client.clientno}</td>
                  <td>{client.fname}</td>
                  <td>{client.lname}</td>
                  <td>{client.telephone}</td>
                  <td>{client.street}</td>
                  <td>{client.city}</td>
                  <td>{client.email}</td>
                  <td>{client.preftype}</td>
                  <td>{client.maxrent}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(client.clientno)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(client.clientno)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ClientList;

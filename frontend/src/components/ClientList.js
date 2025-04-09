import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ClientList.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/client');
      if (!Array.isArray(response.data)) throw new Error('Expected an array');

      const formattedClients = response.data.map(client => ({
        clientNo: client.clientNo || "N/A",
        fname: client.fname || "N/A",
        lname: client.lname || "N/A",
        telno: client.telno || "N/A",
        street: client.street || "N/A",
        city: client.city || "N/A",
        email: client.email || "N/A",
        preftype: client.preftype || "N/A",
        maxrent: client.maxrent ? `$${client.maxrent.toLocaleString()}` : "N/A"
      }));

      setClients(formattedClients);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch client data.');
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
      await axios.delete(`http://localhost:8080/client/${clientId}`);
      setClients((prev) => prev.filter(c => c.clientNo !== clientId));
      alert('Client deleted successfully.');
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Failed to delete client.');
    }
  };

  const filteredClients = clients.filter(client =>
    client.clientNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.lname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="client-container">
      <h1>Client List</h1>
      <Link to="/clients/add">
        <button className="add-client-button">+ Add New Client</button>
      </Link>

      <div className="search-bar">
        <input
        type="text"
        placeholder="Search by ID, First or Last Name"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to page 1 on new search
        }}
        />
      </div>

      {loading ? (
        <div className="loading">Loading client data...</div>
      ) : (
        <>
          {error && <div className="error-message">{error}</div>}
          <table className="client-table">
            <thead>
              <tr>
                <th>Row No</th>
                <th>Client No</th><th>First Name</th><th>Last Name</th><th>Telephone</th>
                <th>Street</th><th>City</th><th>Email</th><th>Preferred Type</th><th>Max Rent</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClients.map((client, index) => (
                <tr key={client.clientNo} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td> {/* Row number */}
                  <td>{client.clientNo}</td>
                  <td>{client.fname}</td>
                  <td>{client.lname}</td>
                  <td>{client.telno}</td>
                  <td>{client.street}</td>
                  <td>{client.city}</td>
                  <td>{client.email}</td>
                  <td>{client.preftype}</td>
                  <td>{client.maxrent}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(client.clientNo)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(client.clientNo)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientList;

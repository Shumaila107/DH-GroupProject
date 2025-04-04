import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BranchSearch from "./BranchSearch"; // Import the new component
import "./BranchList.css";

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  // Initial data fetch
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/branch");
      const formattedBranches = response.data.map((branch) => ({
        branchNo: branch.branchNo || "N/A",
        street: branch.street || "N/A",
        city: branch.city || "N/A",
        postcode: branch.postcode || "N/A",
      }));
      setBranches(formattedBranches);
      setError(null);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("Failed to fetch branch data");
    } finally {
      setLoading(false);
    }
  };

  // Search handler
  const handleSearch = async (branchNo) => {
    if (!branchNo) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/branch/${branchNo}`);
      setBranches([response.data]); // Single result array
      setCurrentPage(1);
      setError(null);
    } catch (error) {
      if (error.response?.status === 404) {
        alert("No branch found with that number");
      } else {
        setError("Search failed. Please try again.");
      }
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  // Clear search handler
  const handleClearSearch = () => {
    fetchBranches();
    setCurrentPage(1);
  };

  const handleEdit = (branchNo) => {
    navigate(`/edit-branch/${branchNo}`);
  };

  const handleDelete = async (branchNo) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    
    try {
      await axios.delete(`http://localhost:8080/branch/${branchNo}`);
      setBranches(prev => prev.filter(branch => branch.branchNo !== branchNo));
      alert("Branch deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete branch");
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(branches.length / itemsPerPage);
  const paginatedBranches = branches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="branch-container">
      <h1>Branch List</h1>
      
      <div className="branch-actions">
        <BranchSearch 
          onSearch={handleSearch} 
          onClear={handleClearSearch}
        />
        <button 
          className="add-branch-button"
          onClick={() => navigate("/branch/add")}
        >
          + Add New Branch
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading branch data...</div>
      ) : (
        <>
          {error && <div className="error-message">{error}</div>}
          
          <table className="branch-table">
            <thead>
              <tr>
                <th>Branch No</th>
                <th>Street</th>
                <th>City</th>
                <th>Postcode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBranches.map((branch, index) => (
                <tr key={branch.branchNo} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{branch.branchNo}</td>
                  <td>{branch.street}</td>
                  <td>{branch.city}</td>
                  <td>{branch.postcode}</td>
                  <td>
                    <button 
                      className="edit-btn" 
                      onClick={() => handleEdit(branch.branchNo)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(branch.branchNo)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage(p => p - 1)} 
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => p + 1)} 
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BranchList;

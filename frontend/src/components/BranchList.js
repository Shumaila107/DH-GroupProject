import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./BranchList.css"; // Import CSS styles

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const navigate = useNavigate(); // For Navigation

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    setLoading(true); // Show loading indicator during API call
    try {
      console.log("Fetching branch data...");
      const response = await axios.get("http://localhost:8080/branch");

      console.log("API Response:", response.data); // Log API response

      if (!Array.isArray(response.data)) {
        throw new Error("Invalid API response: Expected an array");
      }

      //Normalize API response to match UI experience
      const formattedBranches = response.data.map((branch) => ({
        branchNo: branch.branchNo || "N/A",
        street: branch.street || "N/A",
        city: branch.city || "N/A",
        postcode: branch.postcode || "N/A",
      }));

      setBranches(formattedBranches);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(
        "Error fetching branch data:",
        error.response?.data || error.message
      );
      setError("Failed to fetch branch data. Showing mock data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (branchNo) => {
    navigate(`/edit-branch/${branchNo}`);
  };

  const handleDelete = async (branchNo) => {
    if (!window.confirm("Are you sure you want to delete this branch?"))
      return;

    try {
      await axios.delete(`http://localhost:8080/branch/${branchNo}`);
      setBranches((prevBranches) =>
        prevBranches.filter((branch) => branch.branchNo !== branchNo)
      );
      alert("Branch deleted successfully.");
    } catch (error) {
      console.error("Error deleting branch:", error);
      alert("Failed to delete branch.");
    }
  };

  // New function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter branches based on search query
  const filteredBranches = branches.filter((branch) =>
    Object.values(branch).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="branch-container">
      <h1>Branch List</h1>
      <div className="branch-actions">
        <input
          type="text"
          placeholder="Search branches..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="branch-search-input"
        />
        <Link to="/branch/add">
          <button className="add-branch-button">+ Add New Branch</button>
        </Link>
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
              {filteredBranches.map((branch, index) => (
                <tr
                  key={branch.branchNo}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
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
        </>
      )}
    </div>
  );
};

export default BranchList;

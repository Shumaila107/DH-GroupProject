import React, { useState } from 'react'; // Add React import
import './BranchSearch.css';

// Convert to proper React component
const BranchSearch = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('Please enter a branch number');
      return;
    }
    onSearch(searchTerm.trim());
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter Branch Number"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      <button 
        onClick={() => {
          setSearchTerm('');
          onClear();
        }} 
        className="clear-button"
      >
        Clear
      </button>
    </div>
  );
};

// Add default export
export default BranchSearch; // <-- This was missing

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import MainMenu from './MainMenu';
import StaffHiringForm from './StaffHiringForm'; 
import reportWebVitals from './reportWebVitals';
import Staff from './staff';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainMenu />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/staff-hire" element={<StaffHiringForm />} />
                {/* Add routes for Branch and Client forms here */}
                {/* <Route path="/branch" element={<BranchForm />} />
                <Route path="/client" element={<ClientForm />} /> */}
            </Routes>
        </Router>
    );
};

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
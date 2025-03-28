import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import StaffHiringForm from "./components/StaffHiringForm";
import StaffList from "./components/StaffList";
import EditStaff from "./components/EditStaff";
import BranchAddingForm from "./components/BranchAddingForm.js";
import BranchList from "./components/BranchList";
import EditBranch from "./components/EditBranch.js";
import ClientList from "./components/ClientList";
import ClientAddingForm from "./components/ClientAddingForm";
import EditClient from "./components/EditClient";



function App() {
  return (
    <div style={{ marginTop: '80px' }}> {/* Add style to App's main div */}
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/staff" element={<StaffList />} />
      <Route path="/staff/hire" element={<StaffHiringForm />} />
      <Route path="/edit-staff/:staffId" element={<EditStaff />} />
      {/* New routes for Branch Management */}
      <Route path="/branch" element={<BranchList />} />
      <Route path="/branch/add" element={<BranchAddingForm />} />
      <Route path="/edit-branch/:branchNo" element={<EditBranch/>} />
     {/* New routes for Client Management */}
      <Route path="/client" element={<ClientList />} />
      <Route path="/clients/add" element={<ClientAddingForm />} />
      <Route path="/edit-client/N/A" element={<EditClient />} />    
    </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import StaffHiringForm from "./components/StaffHiringForm";
import StaffList from "./components/StaffList";
import EditStaff from "./components/EditStaff";
import BranchAddress from "./components/BranchAddress";
import EditBranch from "./components/EditBranch";
import OpenBranch from "./components/OpenBranch";


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
      <Route path="/branch-address" element={<BranchAddress />} />
        <Route path="/edit-branch" element={<EditBranch />} />
        <Route path="/open-branch" element={<OpenBranch />} />
    </Routes>
    </div>
  );
}

export default App;

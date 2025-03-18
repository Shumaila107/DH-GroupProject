import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import StaffHiringForm from "./components/StaffHiringForm";
import StaffList from "./components/StaffList";
import EditStaff from "./components/EditStaff";


function App() {
  return (
    <div>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/staff" element={<StaffList />} />
      <Route path="/staff/hire" element={<StaffHiringForm />} />
      <Route path="/edit-staff/:staffId" element={<EditStaff />} />

    </Routes>
    </div>
  );
}

export default App;

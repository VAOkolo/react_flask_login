import { Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Login from "./views/Login";
import Register from "./views/Register";
import Step from "./views/Step";
import Inside from "./views/Inside";

function App() {
  return (
    <UserProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/step" element={<Navigate to="/step/1" />} />
        <Route path="/step/:number" element={<Step />} />
        <Route path="/home" element={<Inside />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

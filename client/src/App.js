import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Register from "./views/Register";
import Steps from "./views/Steps";
import Inside from "./views/Inside";

function App() {
  return (
    <UserProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/steps" element={<Steps />} />
        <Route path="/home" element={<Inside />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

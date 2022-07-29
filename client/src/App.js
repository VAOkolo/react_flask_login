import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Navbar from "./components/Navbar";
import Login from "./views/Login";

function App() {
  return (
    <Fragment>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Fragment>
  );
}

export default App;

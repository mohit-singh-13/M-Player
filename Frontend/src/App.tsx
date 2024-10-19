import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Player from "./pages/Player.tsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/player" element={<Player />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;

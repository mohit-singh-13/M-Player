import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Player from "./pages/Player";
import {ToastContainer} from "react-toastify";

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/player" element={<Player/>} />
            </Routes>

            <ToastContainer />
        </div>
    )
}

export default App

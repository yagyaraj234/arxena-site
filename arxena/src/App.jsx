import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="*"
        element={
          <p className=" h-screen w-screen flex items-center justify-center text-3xl font-semibold text-black">
            {" "}
            Page not found
          </p>
        }
      />
    </Routes>
  );
}

export default App;

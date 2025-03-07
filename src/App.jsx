import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import Mypage from "./routes/Mypage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto">
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="signup/" element={<Signup />} />
        <Route path="signin/" element={<Signin />} />
        <Route path="mypage/" element={<Mypage />} />
      </Routes>
    </div>
  );
}

export default App;

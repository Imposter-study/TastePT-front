import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import Signup from "./routes/accounts/Signup";
import Signin from "./routes/accounts/Signin";
import Mypage from "./routes/accounts/Mypage";
import CreatePost from "./routes/community/CreatePost";
import EditPost from "./routes/community/EditPost";
import PostDetail from "./routes/community/PostDetail";

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
        <Route path="community/new/" element={<CreatePost />} />
        <Route path="community/:postID/" element={<PostDetail />} />
        <Route path="community/:postID/edit/" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;

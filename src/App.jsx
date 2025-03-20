import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import Signup from "./routes/accounts/Signup";
import Signin from "./routes/accounts/Signin";
import Mypage from "./routes/accounts/Mypage";
import Changepassword from "./routes/accounts/Changepassword";
import CreatePost from "./routes/community/CreatePost";
import EditPost from "./routes/community/EditPost";
import PostDetail from "./routes/community/PostDetail";
import PostList from "./routes/community/PostList";
import Profile from "./routes/accounts/Profile";
import ChatBot from "./routes/ChatBot";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="signup/" element={<Signup />} />
          <Route path="signin/" element={<Signin />} />
          <Route path="mypage/" element={<Mypage />} />
          <Route path=":nickname/" element={<Profile />} />
          <Route path="password/" element={<Changepassword />} />
          <Route path="community/" element={<PostList />} />
          <Route path="community/new/" element={<CreatePost />} />
          <Route path="community/:postID/" element={<PostDetail />} />
          <Route path="community/:postID/edit/" element={<EditPost />} />
          <Route path="chatbot/" element={<ChatBot />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

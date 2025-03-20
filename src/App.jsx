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
import ProtectedRouter from "./routes/ProtectedRouter";

function App() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />                                    {/* 메인페이지 */}
        <Route path="signup/" element={<Signup />} />                            {/* 회원가입 페이지 */}
        <Route path="signin/" element={<Signin />} />                            {/* 로그인 페이지 */} 
        {/* 로그인 후 접근 가능한 페이지 */}
        <Route element={<ProtectedRouter />}>
          <Route path="community/new/" element={<CreatePost />} />               {/* 게시글 작성 페이지 */}
          <Route path="community/:postID/edit/" element={<EditPost />} />        {/* 게시글 수정 페이지 */}
          <Route path="mypage/" element={<Mypage />} />                          {/* 마이페이지(프로필 수정) */}
          <Route path="password/" element={<Changepassword />} />                {/* 비밀번호 변경 페이지 */}
          <Route path="chatbot/" element={<ChatBot />} />                        {/* 챗봇 페이지 */}
          <Route path=":nickname/" element={<Profile />} />                      {/* 프로필 페이지 */}
        </Route>
        <Route path="community/" element={<PostList />} />                       {/* 게시글 목록 페이지 */}
        <Route path="community/:postID/" element={<PostDetail />} />             {/* 게시글 상세 페이지 */}
      </Routes>
    </div>
  );
}

export default App;

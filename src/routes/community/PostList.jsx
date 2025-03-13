import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostList() {
  const apiURL = import.meta.env.VITE_API_URL;
  const baseURL = import.meta.env;
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);

  const getPostList = async () => {
    const response = await axios.get(`${apiURL}community/`);
    console.log(response.data);
    setPostList(response.data);
    setLoading(false);
  };

  // 내용애서 text만 추출
  const extractString = (htmlString) => {
    const parser = new DOMParser(); // HTML을 DOM 객체로 파싱
    const doc = parser.parseFromString(htmlString, "text/html");

    const textContent = doc.body.textContent; // 태그를 제외한 텍스트를 가져옴
    // console.log(textContent);
    return textContent;
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div className="flex flex-col justity-center items-center pt-20">
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h1>PostList</h1>
          <div className="h-screen">
            {postList.map((post) => (
              <Link to={`/community/${post.id}`}>
                <div className="border p-5 my-5">
                  <h2>{post.title}</h2>
                  {/* <div className="text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/src="\/media\//g, `src="${baseURL}media/`)
                      .slice(0, 100),
                  }}
                /> */}
                  <div className="max-w-[800px] text-gray-400">
                    {extractString(post.content)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostList;

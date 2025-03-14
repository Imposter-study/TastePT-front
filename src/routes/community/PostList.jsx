import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import defaultImage from "/no-image.png";
import { publicCommunityAPI } from "../../api/communityApi";

function PostList() {
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);

  const getPostList = async () => {
    const response = await publicCommunityAPI.get(``);
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
        <div className="w-5/6 px-10">
          {/* <h1>PostList</h1> */}
          <div className="flex justify-end">
            <div className="min-w-[170px] pt-3">
              <Link to="/community/new">
                <Button buttonName="게시글 작성하러 가기" />
              </Link>
            </div>
          </div>
          <div className="">
            {postList.map((post) => (
              <Link to={`/community/${post.id}`} key={post.id}>
                <div className="flex my-5">
                  <div className="m-1 p-1">
                    <img
                      src={defaultImage}
                      alt="thumbnail"
                      className="size-15"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h2 className="font-bold text-xl">{post.title}</h2>
                    {/* <div className="text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/src="\/media\//g, `src="${baseURL}media/`)
                      .slice(0, 100),
                  }}
                /> */}
                    <div className="max-w-[800px] text-gray-400">
                      {extractString(post.content).slice(0, 100)}...
                    </div>
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

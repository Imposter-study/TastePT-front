import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import defaultImage from "/no-image.png";
import { publicCommunityAPI } from "../../api/communityApi";
import PageNation from "../../components/PageNation";

function PostList() {
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [totalPostCount, setTotalPostCount] = useState(0);

  // 쿼리스트링
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1; // 현재 페이지
  const pageSize = Number(searchParams.get("page_size")) || 10; // 한 페이지에 보여줄 게시글 수

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
  };

  const getPostList = async () => {
    const response = await publicCommunityAPI.get(
      `?page=${currentPage}&page_size=${pageSize}`
    );
    // console.log(response.data);
    setPostList(response.data.results);
    setTotalPostCount(response.data.count);
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
  }, [currentPage, pageSize]);

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
                <div className="flex my-5 min-w-[700px]">
                  <div className="m-1 p-1">
                    <img
                      src={post.thumbnail ? post.thumbnail : defaultImage}
                      alt="thumbnail"
                      className="size-15 object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    {/* 게시글 제목 */}
                    <h2 className="font-bold text-xl">{post.title}</h2>
                    {/* 게시글 내용 */}
                    <div className="max-w-[800px] text-gray-400">
                      {extractString(post.content).slice(0, 50)}...
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <PageNation
            totalPostCount={totalPostCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default PostList;

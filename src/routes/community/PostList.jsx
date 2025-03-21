import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import defaultImage from "../../assets/no-image.png";
import { publicCommunityAPI } from "../../api/communityApi";
import PageNation from "../../components/PageNation";
import ProtectedButton from "../../components/ProtectedButton";

function PostList() {
  // 쿼리스트링
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1; // 현재 페이지
  const pageSize = Number(searchParams.get("page_size")) || 10; // 한 페이지에 보여줄 게시글 수

  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [searchWord, setSearchWord] = useState(
    searchParams.get("search") || ""
  );

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(e.target['search-input'].value);
    const searchInput = e.target["search-input"].value;
    setSearchParams({ search: searchInput });
    setSearchWord(searchInput);
  };

  const getPostList = async () => {
    const response = await publicCommunityAPI.get(
      `?page=${currentPage}&page_size=${pageSize}&search=${searchWord}`
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
  }, [currentPage, pageSize, searchWord]);

  return (
    <div className="flex flex-col justify-center items-center pt-20">
      {loading ? (
        "Loading..."
      ) : (
        <div className="w-5/6 px-10 h-screen">
          {/* <h1>PostList</h1> */}
          <div className="flex justify-between items-center gap-2 py-5">
            <div className="flex-1">
              <form className="flex gap-2" onSubmit={handleSearch}>
                <input
                  id="search-input"
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-blue-500"
                />
                <Button
                  buttonName="🔍"
                  bgColor="white"
                  borderColor="gray"
                  textSize="lg"
                />
              </form>
            </div>
          </div>
          <div className="border-b-2 border-gray-400">
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
      {/* 고정된 게시글 작성 버튼 */}
      <div className="fixed bottom-10 right-40 shadow-lg">
        <ProtectedButton to="/community/new">
          <Button
            buttonName="✏️ 게시글 작성"
            textColor="black"
            bgColor="white"
            borderColor="gray"
            textSize="md"
          />
        </ProtectedButton>
      </div>
    </div>
  );
}

export default PostList;

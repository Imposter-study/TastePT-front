import { useSearchParams } from "react-router-dom";

function PageNation({ totalPostCount, currentPage, onPageChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = Number(searchParams.get("page_size")) || 10; // 한 페이지에 보여줄 게시글 수
  const maxPage = Math.ceil(totalPostCount / pageSize); // 전체 페이지 수

  // 보여줄 페이지 번호들을 계산하는 함수
  const getPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 5; // 현재 페이지 주변에 보여줄 페이지 수

    // 항상 처음 페이지 추가
    pageNumbers.push(1);

    let start = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    let end = Math.min(maxPage - 1, start + visiblePages - 1);

    // start와 end 조정
    if (end - start + 1 < visiblePages) {
      start = Math.max(2, end - visiblePages + 1);
    }

    // 처음 페이지와 시작 페이지 사이에 간격이 있으면 ... 추가
    if (start > 2) {
      pageNumbers.push("...");
    }

    // 중간 페이지들 추가
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    // 마지막 페이지와 끝 페이지 사이에 간격이 있으면 ... 추가
    if (end < maxPage - 1) {
      pageNumbers.push("...");
    }

    // 마지막 페이지가 1보다 크면 추가
    if (maxPage > 1) {
      pageNumbers.push(maxPage);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 py-5">
      {/* 이전 페이지 버튼 */}
      <div
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className={`cursor-pointer p-2 ${
          currentPage === 1 ? "text-gray-300" : "hover:text-blue-500"
        }`}
      >
        ＜
      </div>

      {/* 페이지 번호들 */}
      {getPageNumbers().map((page, index) => (
        <div
          key={index}
          onClick={() => page !== "..." && onPageChange(page)}
          className={`cursor-pointer p-2 ${
            page === "..."
              ? "cursor-default"
              : currentPage === page
              ? "text-blue-500 font-bold"
              : "hover:text-blue-500"
          }`}
        >
          {page}
        </div>
      ))}

      {/* 다음 페이지 버튼 */}
      <div
        onClick={() => currentPage < maxPage && onPageChange(currentPage + 1)}
        className={`cursor-pointer p-2 ${
          currentPage === maxPage ? "text-gray-300" : "hover:text-blue-500"
        }`}
      >
        ＞
      </div>
    </div>
  );
}

export default PageNation;

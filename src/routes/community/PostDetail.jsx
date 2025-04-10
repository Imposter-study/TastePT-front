import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Comment from "../../components/Comment";
import {
  privateCommunityAPI,
  publicCommunityAPI,
} from "../../api/communityApi";
import { useRecoilValue } from "recoil";
import { authUser } from "../../recoil/authAtom";
import ProtectedButton from "../../components/ProtectedButton";
import defaultProfile from "../../assets/image.png";
import { errMessage } from "../../utils/errMessage";
import SafeHtml from "../../components/SafeHTML";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import reportIcon from "../../assets/alarm.png";
import { useAxios } from "../../hooks/useAxios";

function PostDetail() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const { postID } = useParams();
  const [comments, setComments] = useState([]);
  const auth = useRecoilValue(authUser);

  // 게시글 요청
  const { data, loading, notFound } = useAxios(
    `${postID}/`,
    publicCommunityAPI
  );

  const navigate = useNavigate();

  // 댓글 작성
  const submitComment = (event) => {
    event.preventDefault();
    const comment = event.target;
    // console.log(comment["comment-input"].value);

    privateCommunityAPI
      .post(`${postID}/comment/`, {
        content: comment["comment-input"].value,
      })
      .then((response) => {
        // console.log(response);
        // console.log("댓글 작성 성공");
        setComments((prev) => [response.data, ...prev]); // 새 댓글 추가
        comment.reset();
        alert("댓글이 작성되었습니다.");
        // getPost();
      })
      .catch((error) => {
        // console.log(error);
        const errorMessage = errMessage(error);
        alert(errorMessage);
      });
  };

  // 댓글 삭제 성공 시 상태에서 제거
  const handleDeleteComment = (commentID) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentID));
  };

  const goEdit = () => {
    // 로그인한 사용자랑 게시글 작성자 확인 로직 추가
    navigate(`/community/${postID}/edit`);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const deleteConfirm = window.confirm("게시글을 삭제하시겠습니까?");

    if (deleteConfirm) {
      privateCommunityAPI
        .delete(`${postID}/`)
        .then((response) => {
          // console.log(response);
          // console.log("게시글 삭제 성공");
          alert("게시글이 삭제되었습니다.");
          navigate("/community");
        })
        .catch((error) => {
          // console.log(error);
          const errorMessage = errMessage(error);
          alert(errorMessage);
        });
    }
  };

  // 게시글 신고
  const handleReport = () => {
    const reportConfirm = window.confirm("해당 게시글을 신고 하시겠습니까?");
    if (reportConfirm) {
      privateCommunityAPI
        .post(`${postID}/report/`, { type: "post" })
        .then((response) => {
          // console.log(response);
          // console.log("게시글 신고 성공");
          alert("게시글이 신고되었습니다.");
        })
        .catch((error) => {
          // console.log(error);
          const errorMessage = errMessage(error);
          alert(errorMessage);
        });
    }
  };

  useEffect(() => {
    // getPost();
    if (data.comments) {
      setComments(data.comments); // 댓글
      window.scrollTo(0, 0);
    }
  }, [data]);

  if (notFound) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col justify-center items-center pt-20 min-h-screen">
      {loading ? (
        <Loading text="Loading" />
      ) : (
        <div className="w-4/5 min-h-screen">
          {/* 게시글 */}
          <div className="py-5">
            <h1 className="text-3xl font-bold">{data.title}</h1>
          </div>
          <div className="flex justify-between items-center gap-2 border-b-2 border-gray-300 pb-5 text-gray-400">
            <div className="flex items-center gap-2">
              <Link to={`/${data.author.nickname}`}>
                <div className="flex items-center gap-2">
                  <img
                    src={
                      data.author.profile_picture
                        ? data.author.profile_picture
                        : defaultProfile
                    }
                    alt="profile"
                    className="size-7 rounded-full"
                  />
                  <span>{data.author.nickname}</span>
                </div>
              </Link>
              | <span>{data.created_at.slice(0, 10)}</span>
            </div>
            {auth.nickname !== data.author.nickname ? null : (
              <div className="flex justify-end">
                <div className="pl-1">
                  <Button
                    buttonName="수정하기"
                    bgColor="gray"
                    textColor="black"
                    onClick={goEdit}
                  />
                </div>

                <div className="pl-1">
                  <Button
                    buttonName="삭제하기"
                    bgColor="gray"
                    textColor="black"
                    onClick={handleDelete}
                  />
                </div>
              </div>
            )}
          </div>
          <SafeHtml content={data.content} />
          {/* <div
            className="py-5"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(
                /src="\/media\//g,
                `src="${baseURL}/media/`
              ),
            }}
          /> */}

          <div
            onClick={handleReport}
            className="flex justify-end items-center pb-1"
          >
            <img
              src={reportIcon}
              className="size-5 cursor-pointer hover:scale-125"
            />
          </div>
          {/* 댓글 */}
          <div className="border-t-2 border-gray-300 min-w-[200px]">
            <div className="py-5 m-1">
              <ProtectedButton to={`/community/${postID}/`}>
                <form
                  id="comment-form"
                  className="flex"
                  onSubmit={submitComment}
                >
                  <input
                    id="comment-input"
                    className="border-2 border-gray-300 rounded-md w-full pl-3"
                    placeholder="comment"
                  />
                  <div className="px-1">
                    <Button buttonName="submit" />
                  </div>
                </form>
              </ProtectedButton>
            </div>
            {comments.map((comment) => (
              <Comment
                comment={comment}
                key={comment.id}
                onDeleteSuccess={() => handleDeleteComment(comment.id)} // 삭제 성공 시 상태에서 제거
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;

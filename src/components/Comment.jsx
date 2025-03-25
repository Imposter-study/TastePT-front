import { useState } from "react";
import defaultProfile from "../assets/image.png";
import Button from "./Button";
import { commentAPI, privateCommunityAPI } from "../api/communityApi";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUser } from "../recoil/authAtom";
import ProtectedButton from "./ProtectedButton";
import { errMessage } from "../utils/errMessage";
import { getImageUrl } from "../utils/imageUtils";

function Comment({ comment: initialComment, onDeleteSuccess }) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { postID } = useParams();

  const [isEdit, setEdit] = useState(false);
  const [comment, setComment] = useState(initialComment);
  const [makeReply, setMakeReply] = useState(false);
  const auth = useRecoilValue(authUser);

  const commentID = initialComment.id;

  // 댓글 편집 모드로 변경
  const handleEditMode = () => {
    setEdit((prev) => !prev);
    // console.log(isEdit);
  };

  // 답글 작성 모드로 변경
  const handleMakeReplyMode = () => {
    setMakeReply((prev) => !prev);
    // console.log(makeReply);
  };

  // 댓글 수정
  const onEdit = (event) => {
    // 댓글 수정 로직
    event.preventDefault();
    const isEditComment = window.confirm("댓글을 수정하시겠습니까?");
    if (isEditComment) {
      const commentEditForm = event.target;
      // console.log(commentEditForm["comment-input"].value);

      commentAPI
        .put(`${commentID}/`, {
          content: commentEditForm["comment-input"].value,
        })
        .then((response) => {
          // console.log(response);
          // console.log("댓글 수정 성공");
          setComment((prevComment) => ({
            ...prevComment,
            content: response.data.content, // 새로운 내용으로 변경
          }));
          commentEditForm.reset();
          setEdit(false);
        })
        .catch((error) => {
          // console.log(error);
          const errorMessage = errMessage(error);
          alert(errorMessage);
        });
    }
  };

  // 댓글 삭제
  const onDelete = async () => {
    const deleteConfirm = window.confirm("댓글을 삭제하시겠습니까?");

    if (deleteConfirm) {
      await commentAPI
        .delete(`${commentID}/`)
        .then((response) => {
          // console.log(response);
          onDeleteSuccess(); // 부모에서 해당 댓글 제거
          alert("댓글이 삭제되었습니다.");
        })
        .catch((error) => {
          // console.log(error);
          const errorMessage = errMessage(error);
          alert(errorMessage);
        });
    }
  };

  // 답글 작성
  const onMakeReply = (event) => {
    event.preventDefault();
    const replyCommentForm = event.target;
    // console.log(replyCommentForm["reply-input"].value);
    privateCommunityAPI
      .post(`${postID}/comment/`, {
        content: replyCommentForm["reply-input"].value,
        parent: commentID,
      })
      .then((response) => {
        // console.log(response);
        setComment((prevComment) => ({
          ...prevComment,
          reply_comments: [response.data, ...prevComment.reply_comments],
        }));
        replyCommentForm.reset();
        alert("답글이 작성되었습니다.");
      })
      .catch((error) => {
        // console.log(error);
        const errorMessage = errMessage(error);
        alert(errorMessage);
      });
  };

  // 대댓글 삭제
  const onDeleteReply = (replyID) => {
    setComment((prevComment) => ({
      ...prevComment,
      reply_comments: prevComment.reply_comments.filter(
        (reply) => reply.id !== replyID
      ),
    }));
  };

  return (
    <div className="flex items-center pb-2 mb-3 min-w-[300px]">
      <div>
        <div className="flex">
          <div>
            <img
              src={getImageUrl(
                comment.author.profile_picture,
                defaultProfile
              )}
              alt="profile-img"
              className="size-10 m-2 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col w-full px-3">
            <p className="font-bold">
              <Link to={`/${comment.author.nickname}`}>
                {comment.author.nickname}{" "}
              </Link>
              <span className="text-xs text-gray-400 font-light">
                {comment.created_at.slice(0, 10)}
              </span>
            </p>

            {/* 수정 여부에 따라 UI 변경 */}
            {isEdit ? (
              <form
                id="comment-edit-form"
                className="flex items-center space-x-2"
                onSubmit={onEdit}
              >
                <input
                  id="comment-input"
                  className="border w-full"
                  defaultValue={comment.content}
                />
                <div className="">
                  <Button buttonName="수정완료" />
                </div>
              </form>
            ) : (
              <p>{comment.content}</p>
            )}
            <div className="flex text-sm cursor-pointer">
              {comment.parent !== null ? null : (
                <span
                  className="hover:text-purple-500 text-lg pr-1"
                  onClick={handleMakeReplyMode}
                >
                  💬
                </span>
              )}
              {auth.nickname !== comment.author.nickname ? null : (
                <div>
                  {isEdit ? (
                    <span
                      className="hover:text-purple-500 pr-1"
                      onClick={handleEditMode}
                    >
                      [수정 취소]
                    </span>
                  ) : (
                    <span
                      className="hover:text-purple-500 pr-1"
                      onClick={handleEditMode}
                    >
                      [수정]
                    </span>
                  )}
                  <span
                    className="hover:text-purple-500 pr-1"
                    onClick={onDelete}
                  >
                    [삭제]
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {makeReply ? (
          <div className="py-5 m-1">
            <ProtectedButton to={`/community/${postID}/`}>
              <form
                id="reply-form"
                className="flex pl-10"
                onSubmit={onMakeReply}
              >
                <input
                  id="reply-input"
                  className="border-2 border-gray-300 rounded-md w-full pl-3"
                  placeholder="comment"
                />
                <div className="px-1">
                  <Button buttonName="submit" />
                </div>
              </form>
            </ProtectedButton>
            {comment.reply_comments.length === 0 ? (
              <div className="flex flex-col w-full pl-10 p-3 text-gray-400">
                첫 번째 답글을 작성해보세요!
              </div>
            ) : (
              <div className="flex flex-col w-full pl-10 p-3">
                <div>
                  {comment.reply_comments.map((reply) => (
                    <Comment
                      key={reply.id}
                      comment={reply}
                      onDeleteSuccess={() => onDeleteReply(reply.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Comment;

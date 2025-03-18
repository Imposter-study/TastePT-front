import { useState } from "react";
import defaultProfile from "/image.png";
import Button from "./Button";
import { commentAPI } from "../api/communityApi";
import { Link } from "react-router-dom";

function Comment({ comment: initialComment, onDeleteSuccess }) {
  const [isEdit, setEdit] = useState(false);
  const [comment, setComment] = useState(initialComment);

  const commentID = initialComment.id;

  // 댓글 편집 모드로 변경
  const handleEditMode = () => {
    setEdit((prev) => !prev);
    console.log(isEdit);
  };

  // 댓글 수정
  const onEdit = (event) => {
    // 댓글 수정 로직
    event.preventDefault();
    const isEditComment = window.confirm("댓글을 수정하시겠습니까?");
    if (isEditComment) {
      const commentEditForm = event.target;
      console.log(commentEditForm["comment-input"].value);

      commentAPI
        .put(`${commentID}/`, {
          content: commentEditForm["comment-input"].value,
        })
        .then((response) => {
          console.log(response);
          console.log("댓글 수정 성공");
          setComment((prevComment) => ({
            ...prevComment,
            content: response.data.content, // 새로운 내용으로 변경
          }));
          commentEditForm.reset();
          setEdit(false);
        })
        .catch((error) => {
          console.log(error);
          console.log("댓글 수정 실패");
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
          console.log(response);
          onDeleteSuccess(); // 부모에서 해당 댓글 제거
          alert("댓글이 삭제되었습니다.");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="flex items-center border rounded-md mb-3 min-w-[300px]">
      <div>
        <img
          src={
            comment.author.profile_picture
              ? comment.author.profile_picture
              : defaultProfile
          }
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
        <p className="text-sm cursor-pointer">
          {isEdit ? (
            <span className="hover:text-purple-500" onClick={handleEditMode}>
              [수정 취소]
            </span>
          ) : (
            <span className="hover:text-purple-500" onClick={handleEditMode}>
              [수정]
            </span>
          )}
          <span className="hover:text-purple-500" onClick={onDelete}>
            {" "}
            [삭제]
          </span>
        </p>
      </div>
    </div>
  );
}

export default Comment;

import axios from "axios";
import { useEffect, useState } from "react";
import defaultProfile from "/image.png";
import Button from "./Button";

function Comment({ commentID, onDeleteSuccess }) {
  const apiURL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [comment, setComment] = useState({});

  // 댓글 상세 조회
  const getComment = async () => {
    await axios
      .get(`${apiURL}community/comment/${commentID}/`)
      .then((response) => {
        // console.log(response.data);
        setComment(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

      axios
        .put(`${apiURL}community/comment/${commentID}/`, {
          content: commentEditForm["comment-input"].value,
        })
        .then((response) => {
          console.log(response);
          console.log("댓글 수정 성공");
          getComment();
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
      await axios
        .delete(`${apiURL}community/comment/${commentID}/`)
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

  useEffect(() => {
    getComment();
  }, [isEdit]);

  return (
    <>
      {loading ? (
        <div>Loading ... </div>
      ) : (
        <div className="flex items-center border rounded-md mb-3 min-w-[300px]">
          <div>
            <img
              src={defaultProfile}
              alt="profile-img"
              className="size-10 m-2"
            />
          </div>
          <div className="flex flex-col w-full px-3">
            <p className="font-bold">
              {comment.author.nickname}{" "}
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
                <span
                  className="hover:text-purple-500"
                  onClick={handleEditMode}
                >
                  [수정 취소]
                </span>
              ) : (
                <span
                  className="hover:text-purple-500"
                  onClick={handleEditMode}
                >
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
      )}
    </>
  );
}

export default Comment;

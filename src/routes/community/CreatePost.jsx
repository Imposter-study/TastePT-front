import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // 기본 스타일
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { privateCommunityAPI } from "../../api/communityApi";
import { changeBase64toImgFile, urlToImageFile } from "../../utils/imageUtils";
import { getQuillModules, getQuillFormats } from "../../utils/quillUtils";
import { errMessage } from "../../utils/errMessage";

// 이미지 업로드를 위한 컴포넌트
const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const modules = getQuillModules();
  const formats = getQuillFormats();

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (value) => {
    setEditorContent(value);
  };

  const handleCancel = () => {
    const isConfirm = window.confirm("게시글 작성을 취소하시겠습니까?");

    if (isConfirm) {
      navigate("/community");
    }
  };

  // 게시글 제출 시 실행
  const onSubmit = async () => {
    const { modifiedHtml, thumbnailUrl } = await changeBase64toImgFile(
      title,
      editorContent
    );

    // console.log(typeof thumbnailUrl);
    // console.log(thumbnailUrl);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", modifiedHtml);
    const fileName = thumbnailUrl?.split("/").pop();
    if (fileName) {
      const thumbnailFile = await urlToImageFile(thumbnailUrl, fileName);
      formData.append("thumbnail", thumbnailFile);
    }

    privateCommunityAPI
      .post(``, formData)
      .then((response) => {
        // console.log("게시글 저장 성공");
        // console.log(response.data);
        const postID = response.data.id;
        alert("게시글 작성이 완료되었습니다.");
        navigate(`/community/${postID}`);
      })
      .catch((error) => {
        // console.log(error);
        const errorMessage = errMessage(error);
        alert(errorMessage);
      });
  };

  return (
    <div className="flex flex-col pt-20 h-screen">
      <input
        id="title-input"
        placeholder="title"
        className="border rounded-md my-3 p-2"
        required
        onChange={changeTitle}
      />
      <div className="flex-grow overflow-y-auto py-5">
        <ReactQuill
          value={editorContent}
          onChange={changeContent}
          modules={modules}
          formats={formats}
          className="h-10/12"
        />
      </div>
      <div className="flex justify-end py-3">
        <div className="flex">
          <div className="pl-5">
            <Button buttonName="완료" onClick={onSubmit} />
          </div>
          <div className="pl-5">
            <Button buttonName="취소" onClick={handleCancel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

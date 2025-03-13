import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // 기본 스타일
import axios from "axios";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

// 이미지 업로드를 위한 컴포넌트
const CreatePost = () => {
  const apiURL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (value) => {
    setEditorContent(value);
  };

  const changeBase64toImgFile = async (htmlContent) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g; // HTML 문자열에서 <img> 태그의 src 속성 값을 전부 추출
    let match;
    let modifiedHtml = htmlContent; // 변환된 HTML 저장

    while ((match = imgRegex.exec(htmlContent)) !== null) {
      console.log(match);
      const base64Image = match[1]; // 0번은 이미지 태그 전체, 1번은 이미지 태그의 src
      console.log(base64Image);

      if (base64Image.startsWith("data:image")) {
        // Base64 이미지인지 확인
        console.log("base64 이미지 확인");
        console.log(typeof base64Image);
        try {
          // Base64 → Blob 변환
          const base64String = base64Image.split(",");
          console.log(base64String);
          const imgType = base64String[0].split(":")[1].split(";")[0]; // 기존 파일 확장자
          console.log(imgType);
          const byteCharacters = atob(base64String[1]); // "data:image/png;base64," 제거
          // Base64로 인코딩된 문자열을 실제 바이너리 데이터(파일)로 변환
          const byteNumbers = new Array(byteCharacters.length)
            .fill(0)
            .map((_, i) => byteCharacters.charCodeAt(i));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: imgType }); // 확장자는 필요에 따라 변경
          console.log(blob);

          // Blob → File 객체로 변환 (파일명 생성)
          const file = new File(
            [blob],
            `${title}_${Date.now()}.${imgType.split("/")[1]}`,
            {
              type: blob.type,
            }
          );
          console.log(file);

          // 변환된 파일을 서버에 업로드
          const formData = new FormData();
          formData.append("image", file);

          const response = await fetch(`${apiURL}community/upload-image/`, {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          if (response.ok) {
            const uploadedImageUrl = data.file_path;

            // HTML 내 Base64 URL을 업로드된 이미지 URL로 교체
            modifiedHtml = modifiedHtml.replace(base64Image, uploadedImageUrl);
          } else {
            console.error("이미지 업로드 실패:", data);
            alert("이미지 업로드 실패");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    // console.log(modifiedHtml);
    return modifiedHtml; // 변환된 HTML 반환
  };

  // 게시글 제출 시 실행
  const onSubmit = async () => {
    const updatedHtml = await changeBase64toImgFile(editorContent);

    console.log(updatedHtml);

    axios
      .post(`${apiURL}community/`, { title, content: updatedHtml }) // 변환된 HTML 저장
      .then((response) => {
        console.log("게시글 저장 성공");
        console.log(response.data.id);
        const postID = response.data.id;
        navigate(`/${postID}`);
      })
      .catch((error) => {
        console.error("게시글 저장 실패", error);
        alert("게시글 등록에 실패하였습니다.");
      });
  };

  // Quill 설정
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ align: ["", "center", "right"] }],
      ["image"], // 이미지 버튼 추가
    ],
  };

  const formats = [
    "header",
    "font",
    "list",
    "bold",
    "italic",
    "underline",
    "link",
    "image",
    "align",
  ];

  return (
    <div className="flex flex-col justify-center pt-20">
      <input
        id="title-input"
        placeholder="title"
        className="border rounded-md my-3 p-2"
        required
        onChange={changeTitle}
      />
      <ReactQuill
        value={editorContent}
        onChange={changeContent}
        modules={modules}
        formats={formats}
      />
      <Button buttonName="완료" onClick={onSubmit} />
    </div>
  );
};

export default CreatePost;

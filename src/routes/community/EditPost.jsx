import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // 기본 스타일
import Button from "../../components/Button";

function EditPost() {
  const apiURL = import.meta.env.VITE_API_URL;
  const baseURL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const { postID } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  const getPost = async () => {
    const response = await axios.get(`${apiURL}community/${postID}`);
    console.log(response.data);
    setPost((prev) => response.data);
    setLoading((prev) => false);
  };

  const changeTitle = (event) => {
    setPost((prevPost) => ({ ...prevPost, title: event.target.value }));
    // console.log(post.title);
  };

  const changeContent = (value) => {
    setPost((prevPost) => ({ ...prevPost, content: value })); // 기존 객체 유지
  };

  const changeBase64toImgFile = async (title, htmlContent) => {
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

  const onSubmit = async () => {
    // console.log(post.content);
    const updatedHtml = await changeBase64toImgFile(post.title, post.content);
    console.log(updatedHtml);

    axios
      .put(`${apiURL}community/${postID}/`, {
        title: post.title,
        content: updatedHtml,
      })
      .then((response) => {
        console.log(response);
        navigate(`/community/${postID}`);
      });
  };

  useEffect(() => {
    getPost();
  }, [postID]);

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
    <div className="flex flex-col items-center pt-20">
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <input
            id="title-input"
            defaultValue={post.title}
            className="border rounded-md my-3 p-2"
            required
            onChange={changeTitle}
          />
          <ReactQuill
            value={post.content.replace(
              /src="\/media\//g,
              `src="${baseURL}media/`
            )}
            onChange={changeContent}
            modules={modules}
            formats={formats}
          />
          <Button buttonName="완료" onClick={onSubmit} />
        </div>
      )}
    </div>
  );
}

export default EditPost;

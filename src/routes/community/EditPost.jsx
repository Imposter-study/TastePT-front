import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // 기본 스타일

function EditPost() {
  const apiURL = import.meta.env.VITE_API_URL;
  const baseURL = import.meta.env.VITE_BASE_URL;

  const { postID } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  const getPost = async () => {
    const response = await axios.get(`${apiURL}community/${postID}`);
    console.log(response.data);
    setPost((prev) => response.data);
    setLoading((prev) => false);
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
          <h1>Edit post</h1>
          <input
            id="title-input"
            value={post.title}
            className="border rounded-md my-3 p-2"
            required
            onChange={null}
          />
          <ReactQuill
            value={post.content.replace(
              /src="\/media\//g,
              `src="${baseURL}media/`
            )}
            onChange={null}
            modules={modules}
            formats={formats}
          />
          {/* <Button buttonName="완료" onClick={onSubmit} /> */}
        </div>
      )}
    </div>
  );
}

export default EditPost;

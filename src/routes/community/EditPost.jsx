import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // 기본 스타일
import Button from "../../components/Button";
import {
  privateCommunityAPI,
  publicCommunityAPI,
} from "../../api/communityApi";
import { changeBase64toImgFile, urlToImageFile } from "../../utils/imageUtils";
import { getQuillModules, getQuillFormats } from "../../utils/quillUtils";
import { errMessage } from "../../utils/errMessage";
import Loading from "../../components/Loading";

function EditPost() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const { postID } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  const modules = getQuillModules();
  const formats = getQuillFormats();

  const getPost = async () => {
    const response = await publicCommunityAPI.get(`${postID}`);
    // console.log(response.data);
    setPost(response.data);
    setLoading(false);
  };

  const changeTitle = (event) => {
    setPost((prevPost) => ({ ...prevPost, title: event.target.value }));
    // console.log(post.title);
  };

  const changeContent = (value) => {
    setPost((prevPost) => ({ ...prevPost, content: value })); // 기존 객체 유지
  };

  const handleCancel = () => {
    const isConfirm = window.confirm("게시글 수정을 취소하시겠습니까?");

    if (isConfirm) {
      navigate(`/community/${postID}`);
    }
  };

  const onSubmit = async () => {
    // console.log(post.content);
    const { modifiedHtml, thumbnailUrl } = await changeBase64toImgFile(
      post.title,
      post.content
    );
    // console.log(modifiedHtml);
    // console.log(typeof thumbnailUrl); 
    // console.log(thumbnailUrl);
    // const thumbnailType = "image/" + thumbnailUrl.split(".").pop();
    // console.log(thumbnailType);

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", modifiedHtml);

    const fileName = thumbnailUrl?.split("/").pop();
    if (fileName) {
      const thumbnailFile = await urlToImageFile(thumbnailUrl, fileName);
      formData.append("thumbnail", thumbnailFile);
    }

    privateCommunityAPI
      .put(`${postID}/`, formData)
      .then((response) => {
        // console.log(response);
        alert("게시글 수정이 완료되었습니다.");
        navigate(`/community/${postID}`);
      })
      .catch((error) => {
        // console.log(error);
        const errorMessage = errMessage(error);
        alert(errorMessage);
      });
  };

  useEffect(() => {
    getPost();
  }, [postID]);

  return (
    <div className="flex flex-col pt-20 h-screen">
      {loading ? (
        <Loading text="Loading" />
      ) : (
        <div className="flex flex-col h-screen">
          <input
            id="title-input"
            defaultValue={post.title}
            className="border rounded-md my-3 p-2 w-full"
            required
            onChange={changeTitle}
          />
          <div className="flex-grow overflow-y-auto py-5">
            <ReactQuill
              value={post.content.replace(
                /src="\/media\//g,
                `src="${baseURL}/media/`
              )}
              onChange={changeContent}
              modules={modules}
              formats={formats}
              className="h-10/12"
            />
          </div>
          <div className="flex justify-end py-3">
            <div className="flex">
              <div className="pl-5">
                <Button buttonName="수정" onClick={onSubmit} />
              </div>
              <div className="pl-5">
                <Button buttonName="취소" onClick={handleCancel} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditPost;

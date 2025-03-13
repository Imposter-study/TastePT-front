import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import defaultProfile from "/image.png";

function PostDetail() {
  const apiURL = import.meta.env.VITE_API_URL;
  const baseURL = import.meta.env.VITE_BASE_URL;

  const { postID } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  const getPost = async () => {
    const response = await axios.get(`${apiURL}community/${postID}/`);
    console.log(response.data);
    setPost((prev) => response.data);
    setLoading((prev) => false);
  };

  const submitComment = (event) => {
    event.preventDefault();
    const comment = event.target;
    console.log(comment["comment-input"].value);

    axios
      .post(`${apiURL}community/${postID}/comment/`, {
        content: comment["comment-input"].value,
      })
      .then((response) => {
        console.log(response);
        console.log("댓글 작성 성공");
        comment.reset();
        getPost();
      })
      .catch((error) => {
        console.log(error);
        console.log("댓글 작성 실패");
      });
  };

  useEffect(() => {
    getPost();
  }, [postID]);

  return (
    <div className="flex flex-col justify-center items-center pt-20">
      {loading ? (
        "Loading ..."
      ) : (
        <div className="w-4/5">
          {/* 게시글 */}
          <div className="py-5">
            <h1 className="text-3xl font-bold">{post.title}</h1>
          </div>
          {/* {post.content} */}
          <div
            className="py-5"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(
                /src="\/media\//g,
                `src="${baseURL}media/`
              ),
            }}
          />

          {/* 댓글 */}
          <div className="border-t min-w-[200px]">
            <div className="py-5 m-1">
              <form id="comment-form" className="flex" onSubmit={submitComment}>
                <input
                  id="comment-input"
                  className="border-2 border-gray-300 rounded-md w-full pl-3"
                  placeholder="comment"
                />
                <div className="px-1">
                  <Button buttonName="submit" />
                </div>
              </form>
            </div>
            {post.comments.map((comment) => (
              <div
                className="flex border rounded-md mb-3 min-w-[200px]"
                key={comment.id}
              >
                <div>
                  <img
                    src={defaultProfile}
                    alt="profile-img"
                    className="size-10 m-2"
                  />
                </div>
                <div className="flex flex-col w-full px-3">
                  <p className="font-bold">
                    {comment.author.nickname} <span className="text-xs text-gray-400 font-light">{comment.created_at.slice(0,10)}</span>
                  </p>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;

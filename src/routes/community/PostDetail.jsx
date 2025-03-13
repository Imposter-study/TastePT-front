import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    getPost();
  }, [postID]);

  return (
    <div className="flex flex-col justify-center items-center pt-20">
      {loading ? (
        "Loading ..."
      ) : (
        <div>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          {/* {post.content} */}
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.replace(
                /src="\/media\//g,
                `src="${baseURL}media/`
              ),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default PostDetail;

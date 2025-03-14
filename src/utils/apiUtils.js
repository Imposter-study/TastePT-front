// utils/apiUtils.js
import { publicCommunityAPI } from "../api/communityApi";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await publicCommunityAPI.post("upload-image/", formData);
    if (response.status === 201) {
      return response.data.file_path; // 업로드된 이미지 URL 반환
    } else {
      throw new Error("이미지 업로드 실패");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

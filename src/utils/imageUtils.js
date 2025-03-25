import { uploadImage } from "./apiUtils";

export const changeBase64toImgFile = async (title, htmlContent) => {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  let match;
  let modifiedHtml = htmlContent;
  let thumbnailUrl = null;

  while ((match = imgRegex.exec(htmlContent)) !== null) {
    const base64Image = match[1];

    // 첫 번째 이미지이고 base64가 아닌 경우 썸네일로 지정(게시글 수정 시 썸네일 지정)
    if (!thumbnailUrl && !base64Image.startsWith("data:image")) {
      thumbnailUrl = base64Image;
    }

    if (base64Image.startsWith("data:image")) {
      try {
        const base64String = base64Image.split(",");
        const imgType = base64String[0].split(":")[1].split(";")[0];
        const byteCharacters = atob(base64String[1]);
        const byteNumbers = new Array(byteCharacters.length)
          .fill(0)
          .map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: imgType });

        const file = new File(
          [blob],
          `${title}_${Date.now()}.${imgType.split("/")[1]}`,
          { type: blob.type }
        );

        const uploadedImageUrl = await uploadImage(file);
        if (!thumbnailUrl) {
          thumbnailUrl = uploadedImageUrl;
        }
        modifiedHtml = modifiedHtml.replace(base64Image, uploadedImageUrl);
      } catch (error) {
        console.log(error);
        alert("이미지 업로드 실패");
      }
    }
  }
  return { modifiedHtml, thumbnailUrl };
};

// URL을 이미지 파일로 변환하는 함수
export const urlToImageFile = async (imageUrl, fileName) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  try {
    // 이미지 URL에 도메인이 있는 경우
    if (imageUrl.startsWith("http")) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } else {
      // 이미지 URL에 도메인이 없는 경우
      const response = await fetch(baseURL + imageUrl);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    }
  } catch (error) {
    console.error("이미지 URL을 파일로 변환하는데 실패했습니다:", error);
    throw error;
  }
};

// 환경에 따른 이미지 url 경로 변경 함수
export const getImageUrl = (imagePath, defaultImage = '') => {
  if (!imagePath) return defaultImage;
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  if (import.meta.env.DEV) {
    const baseURL = import.meta.env.VITE_BASE_URL;
    return baseURL + imagePath;
  }
  
  return imagePath;
};
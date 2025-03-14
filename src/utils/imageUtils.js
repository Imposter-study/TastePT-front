// utils/imageUtils.js
import { uploadImage } from "./apiUtils";

export const changeBase64toImgFile = async (title, htmlContent) => {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  let match;
  let modifiedHtml = htmlContent;

  while ((match = imgRegex.exec(htmlContent)) !== null) {
    const base64Image = match[1];

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
        modifiedHtml = modifiedHtml.replace(base64Image, uploadedImageUrl);
      } catch (error) {
        console.log(error);
        alert("이미지 업로드 실패");
      }
    }
  }
  return modifiedHtml;
};
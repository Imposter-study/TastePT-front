import DOMPurify from "dompurify";
import PropTypes from "prop-types";

function SafeHtmlComponent({ content }) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const safeHtml = DOMPurify.sanitize(content);

  return (
    <div
      className="py-5"
      dangerouslySetInnerHTML={{
        __html: safeHtml.replace(/src="\/media\//g, `src="${baseURL}/media/`),
      }}
    />
  );
}

export default SafeHtmlComponent;

SafeHtmlComponent.propTypes = {
  content: PropTypes.string.isRequired,
};

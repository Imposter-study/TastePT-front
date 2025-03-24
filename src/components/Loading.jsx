import tastePTLogo from "../assets/tastePT-logo.png";
import styles from "./loading.module.css";

function Loading({ text }) {
  return (
    <div className="text-gray-400 flex items-center gap-2">
      <img src={tastePTLogo} alt="tastept logo" className="w-5 h-5" />
      {text}
      <span className={styles.dots}></span>
    </div>
  );
}

export default Loading;

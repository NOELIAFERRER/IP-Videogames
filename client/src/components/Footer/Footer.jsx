import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <p>
        <a
          className={styles.link}
          href="https://www.linkedin.com/in/noeliaferrer/"
          target="_blank"
          rel="noreferrer"
        >
          Developed by Noelia Ferrer
        </a>
      </p>
    </div>
  );
};

export default Footer;

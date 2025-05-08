import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer tabIndex={-1} className={styles.footer}>
      <p>
        {new Date().getFullYear()} AI Reading App. All rights reserved. Created by
        <a href="https://cheovermeyer.com" target="_blank">
          Che Overmeyer
        </a>
      </p>
      <a href="/privacy-policy">
        <p>Privacy Policy</p>
      </a>
    </footer>
  );
};

export default Footer;

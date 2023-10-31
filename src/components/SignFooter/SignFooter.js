import kakao from '../../assets/images/sign_kakao.png';
import google from '../../assets/images/sign_google.png';
import styles from './SignFooter.module.css';

function SignFooter({ children }) {
  return (
    <footer className={styles.root}>
      <h2 className={styles.title}>{children}</h2>
      <div className={styles.icon}>
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={google} alt="구글 로그인 아이콘" />
        </a>
        <a
          href="https://www.kakaocorp.com/page/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={kakao} alt="카카오톡 로그인 아이콘" />
        </a>
      </div>
    </footer>
  );
}

export default SignFooter;

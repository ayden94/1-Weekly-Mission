import Button from '../components/Button/Button';
import ModalHeader from '../components/ModalHeader/ModalHeader';
import styles from './Delete.module.css';

function DeleteFolder({ children }) {
  return (
    <>
      <ModalHeader title="폴더 삭제" subTitle={children}></ModalHeader>
      <div>
        <Button className={styles.button}>삭제하기</Button>
      </div>
    </>
  );
}

export default DeleteFolder;
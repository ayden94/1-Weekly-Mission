import { ReactNode } from "react";
import Button from "../components/Button/Button";
import ModalHeader from "../components/ModalHeader/ModalHeader";
import styles from "./Delete.module.css";

interface Props {
  children: ReactNode;
}

function DeleteLink({ children }: Props) {
  return (
    <>
      <ModalHeader title="링크 삭제" subTitle={children}></ModalHeader>
      <div>
        <Button className={styles.button}>삭제하기</Button>
      </div>
    </>
  );
}

export default DeleteLink;
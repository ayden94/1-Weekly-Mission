import { MouseEvent, ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import getFolderByFolderID from "@/API/getFolderByFolderID";
import getLinksByFolderID from "@/API/getLinksByFolderID";
import BinderInfo from "@/components/BinderInfo/BinderInfo";
import getSpecificUserData from "@/API/getUser";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "@/styles/shared.module.css";
import useInputController from "@/hooks/useInputController";
import Binder from "@/components/Binder/Binder";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const folder_ID = context.query["id"];
  let folderName;
  let profileImage;
  let userName;
  let links;

  try {
    // 이 폴더의 이름과 소유자의 id 확인
    const FolderData = await getFolderByFolderID(folder_ID);
    let {
      data: [{ user_id: user_ID, name: tryFolderName }],
    } = FolderData;
    folderName = tryFolderName;

    // 이 폴더 주인의 데이터 잡아오기
    const UserData = await getSpecificUserData(user_ID);
    let {
      data: [{ name: tryUserName, image_source: tryProfileImage }],
    } = UserData;
    profileImage = tryProfileImage;
    userName = tryUserName;

    // 이 폴더에 담겨있는 링크들을 확인
    const LinkData = await getLinksByFolderID(user_ID, folder_ID);
    let { data: tryLinks } = LinkData;
    links = tryLinks;
  } catch {
    return {
      notFound: true,
    };
  }

  return {
    props: { folderName, links, userName, profileImage },
  };
};

const Shared: NextPageWithLayout = ({
  folderName,
  userName,
  profileImage,
  links,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const searchBar = useInputController({});

  return (
    <>
      <BinderInfo profileImage={profileImage} folderName={folderName} userName={userName} />
      <section className={styles.root}>
        <SearchBar searchBar={searchBar} />
        <Binder cards={links} shared={true} value={searchBar.value} />
      </section>
    </>
  );
};

// (페이지 컴포넌트 이름).getLayout 으로 호출.
Shared.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Linkbrary : 공유된 폴더</title>
      </Head>
      <Header position="static" />
      <main>{page}</main>
      <Footer />
    </>
  );
};

export default Shared;

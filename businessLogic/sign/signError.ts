import postCheckEmail from "@/API/postCheckEmail";
import { isEmail, isPassword } from "../validation";

const errorText = {
  email: {
    null: "이메일을 입력해주세요",
    wrong: "올바른 이메일 주소가 아닙니다",
    dup: "이미 사용 중인 이메일입니다",
  },
  password: {
    null: "비밀번호를 입력해주세요",
    wrong: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요",
  },
  passwordCheck: {
    wrong: "비밀번호가 일치하지 않아요",
  },
};

interface Props {
  value: string;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
  valueToCompare?: string;
}

const signinEmail = ({ value, setErrorText }: Props) => {
  if (value === "") {
    setErrorText(errorText["email"]["null"]);
  } else if (!isEmail(value)) {
    setErrorText(errorText["email"]["wrong"]);
  } else {
    setErrorText("");
  }
};

const signinPassword = ({ value, setErrorText }: Props) => {
  if (value === "") {
    setErrorText(errorText["password"]["null"]);
  } else {
    setErrorText("");
  }
};

const signupEmail = async ({ value, setErrorText }: Props) => {
  if (value === "") {
    setErrorText(errorText["email"]["null"]);
  } else if (!isEmail(value)) {
    setErrorText(errorText["email"]["wrong"]);
  } else if (await postCheckEmail(value)) {
    setErrorText(errorText["email"]["dup"]);
  } else {
    setErrorText("");
  }
};

const signupPassword = ({ value, setErrorText }: Props) => {
  if (value === "") {
    setErrorText(errorText["password"]["null"]);
  } else if (!isPassword(value)) {
    setErrorText(errorText["password"]["wrong"]);
  } else {
    setErrorText("");
  }
};

const signupPasswordCheck = ({ value, setErrorText, valueToCompare }: Props) => {
  if (value !== valueToCompare) {
    setErrorText(errorText["passwordCheck"]["wrong"]);
  } else {
    setErrorText("");
  }
};

export { signinEmail, signinPassword, signupEmail, signupPassword, signupPasswordCheck };
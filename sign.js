// 눈알 깜빡이는 이벤트
const sign_form = document.querySelectorAll("[type=button]");

const togglePasswordVisibility = (e) => {
    e.target.classList.toggle("input__eyes--on");

    if (e.target.classList.contains("input__eyes--on")) {
        e.target.previousElementSibling.type = "password"
    } else {
        e.target.previousElementSibling.type = "";
    }
}

for (let line of sign_form) {
    line.addEventListener('click', togglePasswordVisibility);
}


    // focusin 때 error 가 있으면 지우는 이벤트
const sign_input = document.querySelectorAll(".input__container");

const removeErrorMessage = (e) => {
    let currentDivTag = e.target.parentElement;

    if (currentDivTag.classList.contains("null_error_border")) {
        currentDivTag.classList.remove("null_error_border")
        currentDivTag.nextElementSibling.remove();
    }
}

for (let line of sign_input) {
    line.addEventListener("focusin", removeErrorMessage)
}

    // focusout 때 (input이 비어있거나 이메일이 잘못되었으면) error 뱉는 이벤트
const emailVerification = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const errorMessageId = {
    signinEmail: "이메일을 입력해주세요",
    signinPassword: "비밀번호를 입력해주세요",
    signinPasswordCheck: "확인할 비밀번호를 입력해주세요",
}

const validateInput = (arg) => {
    if (arg.value === "") {
        return errorMessageId[arg.id]
    } else if (arg.value.match(emailVerification) === null && arg.id === "signinEmail") {
        return "올바른 이메일 주소가 아닙니다.";
    }
}

const renderErrorMessage = (arg, e) => {
    if (arg.textContent !== "") {
        let pointNode = e.target.parentElement;
        pointNode.after(arg);
        pointNode.classList.add("null_error_border");
    }
}

    // 인풋이 비어있거나, 인풋의 이메일이 이상하면 튀어나오는 이벤트 핸들러
const handleInputError = (e) => {
    const errorMessageNode = document.createElement("div");

    errorMessageNode.classList.add("null_error_message");

    errorMessageNode.textContent = validateInput(e.target);

    renderErrorMessage(errorMessageNode, e);
}

    // 반복문을 통해 각각의 노드에 이벤트 핸들러를 달아준다
for (let line of sign_input) {
    line.addEventListener("focusout", handleInputError)
}
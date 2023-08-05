import { useCallback, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";

import debounce from "../../utils/debounce";
import { signUpFetch } from "../../apis";

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailPassed, setIsEmailPassed] = useState(false);
    const [isPasswordPassed, setIsPasswordPassed] = useState(false);

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
        emailValidation(event.target.value);
    };
    const emailValidation = useCallback(
        debounce((email) => {
            const isPassed = email.includes("@");
            if (isPassed) setIsEmailPassed(true);
            else setIsEmailPassed(false);
        }, 500),
        []
    );

    const onChangePassword = (event) => {
        setPassword(event.target.value);
        passwordValidation(event.target.value);
    };
    const passwordValidation = useCallback(
        debounce((password) => {
            const isPassed = password.length >= 8;
            if (isPassed) setIsPasswordPassed(true);
            else setIsPasswordPassed(false);
        }, 500),
        []
    );

    const signUpHandler = () => {
        const response = signUpFetch(email, password);
        console.log(response);
        if (response.response.status === 201) navigate("/signin");
    };

    return (
        <main className="container">
            <header>
                <h1 className="title">회원가입</h1>
            </header>
            <section className="formContainer">
                <input
                    type="text"
                    value={email}
                    onChange={onChangeEmail}
                    placeholder="이메일 입력"
                    data-testid="email-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="비밀번호 입력"
                    data-testid="password-input"
                />
                <button
                    onClick={signUpHandler}
                    disabled={!(isEmailPassed && isPasswordPassed)}
                    data-testid="signup-button"
                >
                    회원가입
                </button>
            </section>
        </main>
    );
};

export default SignUp;

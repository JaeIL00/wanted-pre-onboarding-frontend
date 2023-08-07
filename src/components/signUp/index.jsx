import { useCallback, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import debounce from "../../utils/debounce";

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

    const signUpHandler = async () => {
        const response = await axios({
            baseURL: "https://www.pre-onboarding-selection-task.shop",
            url: "/auth/signup",
            method: "POST",
            headers: {
                ContentType: "application/json",
            },
            data: {
                email,
                password,
            },
        });
        if (response.status === 201) navigate("/signin");
    };

    return (
        <>
            <header>
                <h1 className="title">회원가입</h1>
            </header>
            <main className="container">
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
        </>
    );
};

export default SignUp;

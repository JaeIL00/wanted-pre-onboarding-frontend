import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import debounce from "../../utils/debounce";
import { signUpFetch } from "../../apis";

import "./style.scss";

const SignUp = () => {
    const navigate = useNavigate();

    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
    });
    const [isEmailPassed, setIsEmailPassed] = useState(false);
    const [isPasswordPassed, setIsPasswordPassed] = useState(false);

    // Email text handler
    const onChangeEmail = (event) => {
        setSignUpData((prev) => {
            return {
                email: event.target.value,
                password: prev.password,
            };
        });
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

    // Password text handler
    const onChangePassword = (event) => {
        setSignUpData((prev) => {
            return {
                email: prev.email,
                password: event.target.value,
            };
        });
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

    // Sign up fetching
    const signUpHandler = () => {
        signUpFetch(signUpData.email, signUpData.password)
            .then((response) => {
                if (response.status === 201) navigate("/signin");
            })
            .catch(() => {
                setSignUpData({
                    email: "",
                    password: "",
                });
                alert("회원가입 실패");
            });
    };

    return (
        <div className="container">
            <header>
                <h1 className="title">회원가입</h1>
            </header>
            <main>
                <section className="formContainer">
                    <input
                        type="text"
                        value={signUpData.email}
                        onChange={onChangeEmail}
                        placeholder="이메일 입력"
                        data-testid="email-input"
                    />
                    <input
                        type="password"
                        value={signUpData.password}
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
        </div>
    );
};

export default SignUp;

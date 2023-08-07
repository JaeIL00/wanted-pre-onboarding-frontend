import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import debounce from "../../utils/debounce";
import { signInFetch } from "../../apis";

import "./style.scss";

const SignIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailPassed, setIsEmailPassed] = useState(false);
    const [isPasswordPassed, setIsPasswordPassed] = useState(false);

    // Email text handler
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

    // Password text handler
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

    // Sign in fetching
    const signInHandler = () => {
        signInFetch(email, password)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem(
                        "access_token",
                        response.data.access_token
                    );
                    navigate("/todo");
                }
            })
            .catch(() => {
                setEmail("");
                setPassword("");
            });
    };

    return (
        <div className="container">
            <header>
                <h1 className="title">로그인</h1>
            </header>
            <main>
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
                        onClick={signInHandler}
                        disabled={!(isEmailPassed && isPasswordPassed)}
                        data-testid="signin-button"
                    >
                        로그인
                    </button>
                </section>
            </main>
        </div>
    );
};

export default SignIn;

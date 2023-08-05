import { useCallback, useState } from "react";
import "./style.scss";
import debounce from "../../utils/debounce";
import { useNavigate } from "react-router-dom";
import { signInFetch } from "../../apis";

const SignIn = () => {
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

    const signInHandler = () => {
        const response = signInFetch(email, password);
        if (response.response.status === 200) navigate("/todo");
    };

    return (
        <main className="container">
            <header>
                <h1 className="title">로그인</h1>
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
                    onClick={signInHandler}
                    disabled={!(isEmailPassed && isPasswordPassed)}
                    data-testid="signin-button"
                >
                    로그인
                </button>
            </section>
        </main>
    );
};

export default SignIn;

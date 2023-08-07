import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import debounce from "../../utils/debounce";
import { signInFetch } from "../../apis";

import "./style.scss";

const SignIn = () => {
    const navigate = useNavigate();

    const [signInData, setSignInData] = useState({
        email: "",
        password: "",
    });
    const [validation, setValidation] = useState({
        isEmailPassed: false,
        isPasswordPassed: false,
    });

    // Email text handler
    const onChangeEmail = (event) => {
        setSignInData((prev) => {
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
            if (isPassed) {
                setValidation((prev) => {
                    return {
                        isEmailPassed: true,
                        isPasswordPassed: prev.isPasswordPassed,
                    };
                });
            } else {
                setValidation((prev) => {
                    return {
                        isEmailPassed: false,
                        isPasswordPassed: prev.isPasswordPassed,
                    };
                });
            }
        }, 500),
        []
    );

    // Password text handler
    const onChangePassword = (event) => {
        setSignInData((prev) => {
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
            if (isPassed) {
                setValidation((prev) => {
                    return {
                        isEmailPassed: prev.isEmailPassed,
                        isPasswordPassed: true,
                    };
                });
            } else {
                setValidation((prev) => {
                    return {
                        isEmailPassed: prev.isEmailPassed,
                        isPasswordPassed: false,
                    };
                });
            }
        }, 500),
        []
    );

    // Sign in fetching
    const signInHandler = () => {
        signInFetch(signInData.email, signInData.password)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem(
                        "access_token",
                        response.data.access_token
                    );
                    navigate("/todo");
                } else {
                    console.log("hihih");
                }
            })
            .catch(() => {
                setSignInData({
                    email: "",
                    password: "",
                });
                alert("로그인 실패");
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
                        value={signInData.email}
                        onChange={onChangeEmail}
                        placeholder="이메일 입력"
                        data-testid="email-input"
                    />
                    <input
                        type="password"
                        value={signInData.password}
                        onChange={onChangePassword}
                        placeholder="비밀번호 입력"
                        data-testid="password-input"
                    />
                    <button
                        onClick={signInHandler}
                        disabled={
                            !(
                                validation.isEmailPassed &&
                                validation.isPasswordPassed
                            )
                        }
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

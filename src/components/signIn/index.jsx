import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInFetch } from "../../apis";
import {
    onChangeEmailValidation,
    onChangePasswordValidation,
} from "../../utils/inputValidation";

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
                        onChange={(event) =>
                            onChangeEmailValidation(
                                event.target.value,
                                setSignInData,
                                setValidation
                            )
                        }
                        placeholder="이메일 입력"
                        data-testid="email-input"
                    />
                    <input
                        type="password"
                        value={signInData.password}
                        onChange={(event) =>
                            onChangePasswordValidation(
                                event.target.value,
                                setSignInData,
                                setValidation
                            )
                        }
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

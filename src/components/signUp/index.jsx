import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signUpFetch } from "../../apis";
import {
    onChangeEmailValidation,
    onChangePasswordValidation,
} from "../../utils/inputValidation";

import "./style.scss";

const SignUp = () => {
    const navigate = useNavigate();

    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
    });
    const [validation, setValidation] = useState({
        isEmailPassed: false,
        isPasswordPassed: false,
    });

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
                        onChange={(event) =>
                            onChangeEmailValidation(
                                event.target.value,
                                setSignUpData,
                                setValidation
                            )
                        }
                        placeholder="이메일 입력"
                        data-testid="email-input"
                    />
                    <input
                        type="password"
                        value={signUpData.password}
                        onChange={(event) =>
                            onChangePasswordValidation(
                                event.target.value,
                                setSignUpData,
                                setValidation
                            )
                        }
                        placeholder="비밀번호 입력"
                        data-testid="password-input"
                    />
                    <button
                        onClick={signUpHandler}
                        disabled={
                            !(
                                validation.isEmailPassed &&
                                validation.isPasswordPassed
                            )
                        }
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

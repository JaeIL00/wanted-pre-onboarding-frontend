import "./style.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const onClickButton = (path) => {
        path === "로그인" ? navigate("/signin") : navigate("signup");
    };
    return (
        <div className="container">
            <header>
                <h1 className="title">원티드 투두</h1>
            </header>
            <main>
                <nav>
                    <ul>
                        <li>
                            <button
                                className="button"
                                onClick={() => onClickButton("로그인")}
                            >
                                로그인
                            </button>
                        </li>
                        <li>
                            <button
                                className="button"
                                onClick={() => onClickButton("회원가입")}
                            >
                                회원가입
                            </button>
                        </li>
                    </ul>
                </nav>
            </main>
        </div>
    );
};

export default Home;

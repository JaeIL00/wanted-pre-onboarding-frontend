import "./style.scss";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="container">
            <header>
                <h1 className="title">원티드 투두</h1>
            </header>
            <nav>
                <ul>
                    <li>
                        <button className="button">
                            <Link to="/signin">로그인</Link>
                        </button>
                    </li>
                    <li>
                        <button className="button">
                            <Link to="/signup">회원가입</Link>
                        </button>
                    </li>
                </ul>
            </nav>
        </main>
    );
};

export default Home;

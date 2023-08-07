import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Todo from "../../components/todo";

const TodoPage = () => {
    const navigate = useNavigate();

    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const accessTokenStorage = localStorage.getItem("access_token");
        if (!accessTokenStorage) return navigate("/signin");
        setAccessToken(accessTokenStorage);
    }, []);

    return <Todo accessToken={accessToken} />;
};

export default TodoPage;

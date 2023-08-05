import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) navigate("/signin");
    }, []);
    return <main></main>;
};

export default Todo;

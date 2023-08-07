import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SignUp from "../../components/signUp";

const SignUpPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessTokenStorage = localStorage.getItem("access_token");
        if (accessTokenStorage) navigate("/todo");
    }, []);

    return <SignUp />;
};

export default SignUpPage;

import { useNavigate } from "react-router-dom";
import SignIn from "../../components/signIn";
import { useEffect } from "react";

const SignInPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessTokenStorage = localStorage.getItem("access_token");
        if (accessTokenStorage) navigate("/todo");
    }, []);

    return <SignIn />;
};

export default SignInPage;

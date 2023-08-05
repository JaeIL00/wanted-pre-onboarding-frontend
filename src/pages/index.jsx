import { Route, Routes } from "react-router-dom";
import HomePage from "./home";
import SignUpPage from "./signUp";
import SignInPage from "./signin";

const RootRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
        </Routes>
    );
};

export default RootRouter;

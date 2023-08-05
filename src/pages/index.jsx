import { Route, Routes } from "react-router-dom";
import HomePage from "./home";
import SignInPage from "../utils/signin";
import SignUpPage from "./signUp";

const RootRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/signup" element={<SignInPage />} /> */}
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
    );
};

export default RootRouter;

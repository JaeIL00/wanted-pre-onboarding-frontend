import { Route, Routes } from "react-router-dom";

import HomePage from "./home";
import SignUpPage from "./signUp";
import SignInPage from "./signIn";
import TodoPage from "./todo";

const RootRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/todo" element={<TodoPage />} />
        </Routes>
    );
};

export default RootRouter;

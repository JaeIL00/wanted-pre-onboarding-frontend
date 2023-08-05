import { Route, Routes } from "react-router-dom";
import HomePage from "./home";

const RootRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};

export default RootRouter;

import axios from "axios";

const Axios = axios.create({
    baseURL: "https://www.pre-onboarding-selection-task.shop/",
});

export const signInFetch = async (email, password) => {
    const response = await Axios({
        url: "/auth/signin",
        method: "POST",
        headers: {
            ContentType: "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    return response;
};

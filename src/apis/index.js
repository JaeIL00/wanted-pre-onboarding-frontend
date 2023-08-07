import axios from "axios";

const todoAxios = axios.create({
    baseURL: "https://www.pre-onboarding-selection-task.shop",
});

export const signUpFetch = async (email, password) => {
    return await todoAxios({
        url: "/auth/signup",
        method: "POST",
        headers: {
            ContentType: "application/json",
        },
        data: {
            email,
            password,
        },
    });
};

export const signInFetch = async (email, password) => {
    return await todoAxios({
        url: "/auth/signin",
        method: "POST",
        headers: {
            ContentType: "application/json",
        },
        data: {
            email,
            password,
        },
    });
};

export const addTodoFetch = async (accessToken, addTodoText) => {
    return await todoAxios({
        url: "/todos",
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        data: { todo: addTodoText },
    });
};

export const getTodoFetch = async (accessToken) => {
    return await todoAxios({
        url: "/todos",
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const editTodoFetch = async (accessToken, id, editTodoText, isCheck) => {
    return await todoAxios({
        url: `/todos/${id}`,
        method: "PUT",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            todo: editTodoText,
            isCompleted: isCheck,
        },
    });
};

export const deleteTodoFetch = async (accessToken, id) => {
    return await todoAxios({
        url: `/todos/${id}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

import { useLayoutEffect, useState } from "react";
import "./style.scss";
import axios from "axios";

const Todo = ({ accessToken }) => {
    const [addTodoText, setAddTodoText] = useState("");
    const [todoList, setTodoList] = useState([]);

    // Add todo
    const onChangeTodoText = (event) => {
        setAddTodoText(event.target.value);
    };
    const onClickAddButton = async () => {
        const response = await axios({
            baseURL: "https://www.pre-onboarding-selection-task.shop",
            url: "/todos",
            method: "POST",
            headers: {
                ContentType: "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            data: { todo: addTodoText },
        });
        console.log(response);
        if (response.status === 201) {
            setAddTodoText("");
            setTodoList([...todoList, response.data]);
        }
    };

    // Get todo list
    useLayoutEffect(() => {
        if (accessToken) {
            (async () => {
                const response = await axios({
                    baseURL: "https://www.pre-onboarding-selection-task.shop",
                    url: "/todos",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: { todo: addTodoText },
                });
                console.log(response);
                if (response.status === 200) {
                    setTodoList(response.data);
                }
            })();
        }
    }, [accessToken]);

    return (
        <main className="container">
            <section>
                <input
                    value={addTodoText}
                    onChange={onChangeTodoText}
                    data-testid="new-todo-input"
                />
                <button
                    onClick={onClickAddButton}
                    data-testid="new-todo-add-button"
                >
                    추가
                </button>
            </section>
            <section>
                <ul>
                    {todoList.map((todo) => (
                        <li key={todo.id}>
                            <span>{todo.todo}</span>
                            <button>수정</button>
                            <button>삭제</button>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Todo;

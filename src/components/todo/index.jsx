import { useLayoutEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import TodoItem from "../todoItem";

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
                if (response.status === 200) {
                    setTodoList(response.data);
                }
            })();
        }
    }, [accessToken]);

    // Edit todo
    const refreshlisthandler = (id, todoText, todoCompleted) => {
        const freshList = todoList.map((item) => {
            if (item.id === id) {
                return {
                    id: item.id,
                    todo: todoText,
                    isCompleted: todoCompleted,
                    userId: item.userId,
                };
            } else return item;
        });
        setTodoList(freshList);
    };

    // Delete todo
    const deleteTodoItemHandler = (id) => {
        const freshList = todoList.filter((todo) => todo.id !== id);
        setTodoList(freshList);
    };

    return (
        <div className="container">
            <header>
                <h1 className="title">TODO</h1>
            </header>
            <main>
                <section className="addContainer">
                    <input
                        type="text"
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
                    <ul className="listContainer">
                        {todoList.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                refreshlisthandler={refreshlisthandler}
                                deleteTodoItemHandler={deleteTodoItemHandler}
                            />
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Todo;

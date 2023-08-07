import { useLayoutEffect, useState } from "react";

import TodoItem from "../todoItem";
import { addTodoFetch, getTodoFetch } from "../../apis";

import "./style.scss";

const Todo = ({ accessToken }) => {
    const [addTodoText, setAddTodoText] = useState("");
    const [todoList, setTodoList] = useState([]);

    // Add todo
    const onChangeTodoText = (event) => {
        setAddTodoText(event.target.value);
    };
    const onClickAddButton = () => {
        addTodoFetch(accessToken, addTodoText)
            .then((response) => {
                if (response.status === 201) {
                    setAddTodoText("");
                    setTodoList([...todoList, response.data]);
                }
            })
            .catch(() => {
                alert("추가 재시도 해주세요");
            });
    };

    // Get todo list
    useLayoutEffect(() => {
        if (accessToken) {
            (() => {
                getTodoFetch(accessToken)
                    .then((response) => {
                        if (response.status === 200) {
                            setTodoList(response.data);
                        }
                    })
                    .catch(() => {
                        alert("투두 리스트 조회 실패");
                    });
            })();
        }
    }, [accessToken]);

    // Edit todo
    const refreshListhandler = (id, todoText, todoCompleted) => {
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
                                refreshListhandler={refreshListhandler}
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

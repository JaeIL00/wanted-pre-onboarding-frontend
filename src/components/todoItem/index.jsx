import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import "./style.scss";
import debounce from "../../utils/debounce";

const TodoItem = ({ todo, refreshlisthandler }) => {
    const accessTokenRef = useRef("");

    const [editTodoText, setEditTodoText] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [isCheck, setIsCheck] = useState(todo.isCompleted);

    const onChangeEditChecked = (event, id) => {
        setIsCheck(event.target.checked);
        putTodoCompleted(event, id);
    };

    const putTodoCompleted = useCallback(
        debounce(async (event, id) => {
            const response = await axios({
                baseURL: "https://www.pre-onboarding-selection-task.shop",
                url: `/todos/${id}`,
                method: "PUT",
                headers: {
                    ContentType: "application/json",
                    Authorization: `Bearer ${accessTokenRef.current}`,
                },
                data: {
                    todo: todo.todo,
                    isCompleted: event.target.checked,
                },
            });
            if (response.status === 200) {
                setIsCheck(response.data.isCompleted);
            }
        }, 500),
        []
    );

    const onClickEditButton = (todoText, isEdit) => {
        if (isEdit) {
            setEditTodoText(todoText);
            setIsEdit(true);
        } else {
            setIsEdit(false);
        }
    };
    const onChangeEditText = (event) => {
        setEditTodoText(event.target.value);
    };
    const onClickEditRequest = async (id) => {
        const response = await axios({
            baseURL: "https://www.pre-onboarding-selection-task.shop",
            url: `/todos/${id}`,
            method: "PUT",
            headers: {
                ContentType: "application/json",
                Authorization: `Bearer ${accessTokenRef.current}`,
            },
            data: {
                todo: editTodoText,
                isCompleted: isCheck,
            },
        });
        if (response.status === 200) {
            setIsEdit(false);
            refreshlisthandler(
                response.data.id,
                response.data.todo,
                response.data.isCompleted
            );
        }
    };

    useEffect(() => {
        const accessTokenStorage = localStorage.getItem("access_token");
        accessTokenRef.current = accessTokenStorage;
    }, []);

    return (
        <li className="listItem">
            <input
                type="checkbox"
                checked={isCheck}
                onChange={(event) => onChangeEditChecked(event, todo.id)}
            />
            {isEdit ? (
                <>
                    <input
                        type="text"
                        value={editTodoText}
                        onChange={onChangeEditText}
                        className="editInput"
                        data-testid="modify-input"
                    />
                    <div>
                        <button
                            onClick={() => onClickEditRequest(todo.id)}
                            data-testid="submit-button"
                        >
                            제출
                        </button>
                        <button
                            onClick={() => onClickEditButton(todo.todo, false)}
                            data-testid="cancel-button"
                        >
                            취소
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <span>{todo.todo}</span>
                    <div>
                        <button
                            onClick={() => onClickEditButton(todo.todo, true)}
                            data-testid="modify-button"
                        >
                            수정
                        </button>
                        <button data-testid="delete-button">삭제</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;

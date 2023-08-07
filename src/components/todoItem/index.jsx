import { useCallback, useEffect, useRef, useState } from "react";

import debounce from "../../utils/debounce";
import { deleteTodoFetch, editTodoFetch } from "../../apis";

import "./style.scss";

const TodoItem = ({ todo, refreshListhandler, deleteTodoItemHandler }) => {
    const accessTokenRef = useRef("");

    const [editTodoText, setEditTodoText] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [isCheck, setIsCheck] = useState(todo.isCompleted);

    // Checkbox handler
    const onChangeEditChecked = (event, id) => {
        setIsCheck(event.target.checked);
        putTodoCompleted(event, id);
    };
    const putTodoCompleted = useCallback(
        debounce((event, id) => {
            editTodoFetch(
                accessTokenRef.current,
                id,
                todo.todo,
                event.target.checked
            )
                .then((response) => {
                    if (response.status === 200) {
                        setIsCheck(response.data.isCompleted);
                    }
                })
                .catch(() => {
                    alert("체크박스 오류로 재시도 해주세요");
                });
        }, 500),
        []
    );

    // Edit handler
    const onClickEditButton = (todoText, state) => {
        if (state === "수정") {
            setEditTodoText(todoText);
            setIsEdit(true);
        } else {
            setIsEdit(false);
        }
    };
    const onChangeEditText = (event) => {
        setEditTodoText(event.target.value);
    };
    const onClickEditRequest = (id) => {
        editTodoFetch(accessTokenRef.current, id, editTodoText, isCheck)
            .then((response) => {
                if (response.status === 200) {
                    setIsEdit(false);
                    refreshListhandler(
                        response.data.id,
                        response.data.todo,
                        response.data.isCompleted
                    );
                }
            })
            .catch(() => {
                alert("투두 수정 오류로 재시도 해주세요");
            });
    };

    //Delete handler
    const onClickDeleteButton = (id) => {
        deleteTodoFetch(accessTokenRef.current, id)
            .then((response) => {
                if (response.status === 204) {
                    deleteTodoItemHandler(id);
                }
            })
            .catch(() => {
                alert("투두 삭제 오류로 재시도 해주세요");
            });
    };

    // Get access token
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
                            onClick={() => onClickEditButton(todo.todo, "취소")}
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
                            onClick={() => onClickEditButton(todo.todo, "수정")}
                            data-testid="modify-button"
                        >
                            수정
                        </button>
                        <button
                            onClick={() => onClickDeleteButton(todo.id)}
                            data-testid="delete-button"
                        >
                            삭제
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;

import AppLayout from "../components/AppLayout";
import {
  TextField,
  Button,
  Window,
  WindowHeader,
  WindowContent,
  ScrollView,
  Radio,
  Checkbox,
  TextInput,
} from "react95";
import { useNavigate } from "react-router-dom";
import MyModal from "../components/Modal";
import { useState, useEffect } from "react";
import { deleteTodo, getTodo, postTodo, updateTodo } from "../api/todo";

const Todo = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [updateInput, setUpdateInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [updateDisabled, setUpdateDisabled] = useState(true);
  const [postDisabled, setPostDisabled] = useState(true);

  const close = () => {
    navigate(-1);
  };

  const get = async () => {
    const res = await getTodo();
    setTodoList(res.data);
    console.log(todoList[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    get();
  }, []);

  // update일땐 업데이트 요청
  // 삭제일땐 삭제 요청

  const todoPost = async () => {
    const res = await postTodo(input);
    console.log(res.data);
    if (todoList) {
      setTodoList([...todoList, res.data]);
    }
    setInput("");
  };

  const todoUpdate = async (todoId, content, checked) => {
    const res = await updateTodo(todoId, content, checked);

    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        if (todo.id === res.data.id) {
          return {
            id: res.data.id,
            todo: res.data.todo,
            isCompleted: res.data.isCompleted,
            userId: res.data.userId,
          };
        } else {
          return todo;
        }
      });
    });
    cancelUpdate();
  };

  const todoDelete = async (todoId) => {
    const res = await deleteTodo(todoId);

    if (res.status === 204) {
      setTodoList((prevTodoList) => {
        return prevTodoList.filter((todo) => todo.id !== todoId);
      });
    }
  };
  const contentUpdate = (itemId) => {
    setIsUpdate(true);
    setUpdateItemId(itemId);
  };

  const cancelUpdate = () => {
    setIsUpdate(false);
    setUpdateItemId(null);
  };

  const handlePostInput = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    if (inputValue.length > 0) {
      setPostDisabled(false);
    } else {
      setPostDisabled(true);
    }
  };

  const handleUpdateInput = (e) => {
    const inputValue = e.target.value;
    setUpdateInput(inputValue);
    if (inputValue.length > 0) {
      setUpdateDisabled(false);
    } else {
      setUpdateDisabled(true);
    }
  };

  return (
    <>
      {!isLoading && (
        <AppLayout
          Children={
            <MyModal>
              <Window style={{ width: "70vw", height: "40vh" }}>
                <WindowHeader
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    fontFamily: "dunggeunmo-bold",
                    fontSize: "23px",
                  }}
                >
                  TODO: List
                  <Button style={{ marginTop: "3px" }} onClick={close}>
                    <span
                      style={{
                        fontFamily: "dunggeunmo-bold",
                        fontSize: "20px",
                      }}
                    >
                      X
                    </span>
                  </Button>
                </WindowHeader>
                <WindowContent>
                  <ScrollView style={{ height: "25vh" }}>
                    {todoList &&
                      todoList.map((item) => {
                        return (
                          <div
                            key={item.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <li style={{ flex: "1" }}>
                              <input
                                type="checkbox"
                                checked={item.isCompleted}
                                onChange={() =>
                                  todoUpdate(
                                    item.id,
                                    item.todo,
                                    !item.isCompleted
                                  )
                                }
                              />
                              {!isUpdate && updateItemId === null && (
                                <span
                                  style={{
                                    fontSize: "20px",
                                    paddingTop: "10px",
                                    marginRight: "30px",
                                    fontFamily: "dunggeunmo-bold",
                                  }}
                                >
                                  {item.todo}
                                </span>
                              )}
                            </li>
                            <div>
                              {isUpdate && updateItemId === item.id ? (
                                <div style={{ display: "flex" }}>
                                  <TextInput
                                    style={{
                                      fontFamily: "dunggeunmo-bold",
                                      width: "30vw",
                                    }}
                                    data-testid="modify-input"
                                    value={updateInput}
                                    onChange={(e) => handleUpdateInput(e)}
                                  />
                                  <Button
                                    data-testid="submit-button"
                                    onClick={() =>
                                      todoUpdate(
                                        item.id,
                                        updateInput,
                                        item.isCompleted
                                      )
                                    }
                                    disabled={updateDisabled}
                                    style={{ fontFamily: "dunggeunmo-bold" }}
                                  >
                                    완료
                                  </Button>
                                  <Button
                                    data-testid="cancel-button"
                                    onClick={cancelUpdate}
                                    style={{ fontFamily: "dunggeunmo-bold" }}
                                  >
                                    취소
                                  </Button>
                                </div>
                              ) : (
                                <div style={{ display: "flex" }}>
                                  <Button
                                    data-testid="modify-button"
                                    onClick={() => contentUpdate(item.id)}
                                    style={{
                                      fontFamily: "dunggeunmo-bold",
                                      marginRight: "10px",
                                    }}
                                  >
                                    수정
                                  </Button>
                                  <Button
                                    data-testid="delete-button"
                                    onClick={() => todoDelete(item.id)}
                                    style={{ fontFamily: "dunggeunmo-bold" }}
                                  >
                                    삭제
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </ScrollView>
                  <div style={{ display: "flex", marginTop: "10px" }}>
                    <TextInput
                      data-testid="new-todo-input"
                      style={{ fontFamily: "dunggeunmo-bold", width: "30vw" }}
                      value={input}
                      onChange={(e) => handlePostInput(e)}
                    />
                    <Button
                      data-testid="new-todo-add-button"
                      style={{ fontFamily: "dunggeunmo-bold", width: "10vw" }}
                      onClick={todoPost}
                      disabled={postDisabled}
                    >
                      추가
                    </Button>
                  </div>
                </WindowContent>
              </Window>
            </MyModal>
          }
        ></AppLayout>
      )}
    </>
  );
};

export default Todo;

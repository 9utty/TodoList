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
import { getTodo, postTodo, updateTodo } from "../api/todo";

const Todo = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [updateInput, setUpdateInput] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

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
  };

  const todoUpdate = async (todoId, content, checked) => {
    const res = await updateTodo(todoId, content, checked);
    console.log(res.data);

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
  };

  const contentUpdate = () => {
    setIsUpdate(true);
  };

  const cancelUpdate = () => {
    setIsUpdate(false);
  };

  return (
    <>
      {!isLoading && (
        <AppLayout
          Children={
            <MyModal>
              <Window style={{ width: "70vw", height: "40vh" }}>
                <WindowHeader
                  style={{ justifyContent: "space-between", display: "flex" }}
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
                          <>
                            {" "}
                            {isUpdate ? (
                              <li>
                                <div style={{ display: "flex" }}>
                                  <TextInput
                                    style={{ width: "30vw" }}
                                    data-testid="modify-input"
                                    value={updateInput}
                                    onChange={(e) =>
                                      setUpdateInput(e.target.value)
                                    }
                                  />
                                  <Button
                                    data-testid="submit-button"
                                    onClick={todoUpdate(
                                      item.id,
                                      updateInput,
                                      item.isCompleted
                                    )}
                                  >
                                    완료
                                  </Button>
                                  <Button
                                    data-testid="cancel-button"
                                    onClick={cancelUpdate}
                                  >
                                    취소
                                  </Button>
                                </div>
                              </li>
                            ) : (
                              <>
                                <li>
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
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      paddingTop: "10px",
                                      marginRight: "30px",
                                    }}
                                  >
                                    {item.todo}
                                  </span>
                                  <Button
                                    data-testid="modify-button"
                                    onClick={contentUpdate}
                                  >
                                    수정
                                  </Button>
                                  <Button data-testid="delete-button">
                                    삭제
                                  </Button>
                                </li>
                              </>
                            )}
                          </>
                        );
                      })}
                  </ScrollView>
                  <div style={{ display: "flex", marginTop: "10px" }}>
                    <TextInput
                      data-testid="new-todo-input"
                      style={{ width: "30vw" }}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                      data-testid="new-todo-add-button"
                      style={{ width: "10vw" }}
                      onClick={todoPost}
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

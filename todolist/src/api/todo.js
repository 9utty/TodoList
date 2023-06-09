import instance from "../utils/axiosInterceptor";

export const getTodo = () => {
  const API = "http://127.0.0.1:8000/todos";

  return instance.get(API);
};

export const postTodo = (content) => {
  const API = "http://127.0.0.1:8000/todos";

  return instance.post(API, {
    todo: content,
  });
};
export const updateTodo = (todoId, content, isCompleted) => {
  const API = `http://127.0.0.1:8000/todos/${todoId}`;

  return instance.put(API, {
    todo: content,
    isCompleted: isCompleted,
  });
};

export const deleteTodo = (todoId) => {
  const API = `http://127.0.0.1:8000/todos/${todoId}`;

  return instance.delete(API);
};

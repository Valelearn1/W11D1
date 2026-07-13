const BASE_URL = "http://localhost:3001/todos";

const getTodos = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Error fetching todos");
  }

  const data = await response.json();

  return data;
};

const getTodoById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching todo");
  }

  const data = await response.json();

  return data;
};

const createTodo = async (todoData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

  if (!response.ok) {
    throw new Error("Error creating todo");
  }

  const data = await response.json();

  return data;
};

const updateTodo = async (id, changes) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changes),
  });

  if (!response.ok) {
    throw new Error("Error updating todo");
  }

  const data = await response.json();

  return data;
};

const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting todo");
  }

  return response.json();
};

export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };

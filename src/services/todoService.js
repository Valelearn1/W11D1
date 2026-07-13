const BASE_URL = "http://localhost:3001/todos";

const getTodos = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Errore nel recupero dei todo");
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
    throw new Error("Errore nella creazione del todo");
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
    throw new Error("Errore nell'aggiornamento del todo");
  }

  const data = await response.json();

  return data;
};

const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Errore nell'eliminazione del todo");
  }

  return response.json();
};

export { getTodos, createTodo, updateTodo, deleteTodo };

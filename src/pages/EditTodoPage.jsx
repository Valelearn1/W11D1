import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getTodoById, updateTodo } from "../services/todoService";
import TodoForm from "../components/TodoForm";

const EditTodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const loadTodo = async () => {
      const data = await getTodoById(id);
      setTodo(data);
    };

    loadTodo();
  }, [id]);

  const handleUpdate = async (values) => {
    await updateTodo(id, {
      text: values.text,
      category: values.category,
      tag: values.highPriority ? "Urgent" : null,
      dueDate: values.dueDate || null,
      dueTime: values.dueTime || null,
    });
    navigate("/");
  };

  if (!todo) {
    return <p className="text-on-surface-variant dark:text-dusk-text-muted">Loading...</p>;
  }

  const initialValues = {
    text: todo.text,
    category: todo.category,
    dueDate: todo.dueDate ?? "",
    dueTime: todo.dueTime ?? "",
    highPriority: todo.tag === "Urgent",
  };

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container dark:hover:bg-dusk-surface-bright text-on-surface-variant dark:text-dusk-text-muted transition-colors"
      >
        <span className="material-symbols-outlined">close</span>
      </Link>
      <section>
        <p className="text-primary dark:text-dusk-primary text-xs font-semibold uppercase tracking-widest">
          Edit Task
        </p>
        <h2 className="text-3xl font-bold text-on-background dark:text-dusk-text mt-1">
          Edit Task.
        </h2>
      </section>
      <TodoForm
        initialValues={initialValues}
        onSubmit={handleUpdate}
        submitLabel="Save Changes"
      />
    </div>
  );
};

export default EditTodoPage;

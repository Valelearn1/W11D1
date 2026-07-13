import { useNavigate, Link } from "react-router-dom";
import { createTodo } from "../services/todoService";
import TodoForm from "../components/TodoForm";

const NewTodoPage = () => {
  const navigate = useNavigate();

  const handleCreate = async (values) => {
    await createTodo({
      text: values.text,
      category: values.category,
      tag: values.highPriority ? "Urgent" : null,
      dueDate: values.dueDate || null,
      dueTime: values.dueTime || null,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
    });
    navigate("/");
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
          New Journey
        </p>
        <h2 className="text-3xl font-bold text-on-background dark:text-dusk-text mt-1">
          Capture the Moment.
        </h2>
      </section>
      <TodoForm onSubmit={handleCreate} submitLabel="Create Task" />
    </div>
  );
};

export default NewTodoPage;

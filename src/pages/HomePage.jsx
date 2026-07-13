import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTodos, updateTodo, deleteTodo } from "../services/todoService";
import TodoItem from "../components/TodoItem";

const CATEGORY_ICONS = {
  Work: "work",
  Personal: "favorite",
  Health: "fitness_center",
  Creative: "palette",
};

const HomePage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };

    loadTodos();
  }, []);

  const handleToggle = async (todo) => {
    const updated = await updateTodo(todo.id, {
      completed: !todo.completed,
      completedAt: !todo.completed ? new Date().toISOString() : null,
    });
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);
  const completionRate =
    todos.length === 0
      ? 0
      : Math.round((completedTodos.length / todos.length) * 100);

  const categories = Object.entries(
    todos.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {}),
  );

  return (
    <div className="space-y-8">
      <section className="fade-in">
        <p className="text-primary dark:text-dusk-primary text-xs font-semibold uppercase tracking-widest">
          Good Evening
        </p>
        <h2 className="text-3xl font-bold text-on-background dark:text-dusk-text mt-1">
          {activeTodos.length} tasks left for today
        </h2>
      </section>

      <section className="fade-in hover-lift bg-surface-container-lowest dark:bg-dusk-surface-bright rounded-lg p-6" style={{ animationDelay: "0.1s" }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-on-surface dark:text-dusk-text">
              Daily Horizon
            </h3>
            <p className="text-sm text-on-surface-variant dark:text-dusk-text-muted">
              {completionRate}% of your day's path completed
            </p>
          </div>
          <span className="material-symbols-outlined text-primary dark:text-dusk-primary">
            analytics
          </span>
        </div>
        <div className="w-full h-3 bg-surface-container-high dark:bg-dusk-surface rounded-full overflow-hidden">
          <div
            className="h-full sunset-gradient"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-semibold text-on-surface-variant dark:text-dusk-text-muted mt-2">
          <span>{completedTodos.length} tasks done</span>
          <span>{activeTodos.length} tasks remaining</span>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg font-semibold text-on-surface dark:text-dusk-text mb-3">
            Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map(([name, count], index) => (
              <div
                key={name}
                className="fade-in hover-lift bg-surface-container-lowest dark:bg-dusk-surface-bright rounded-lg p-4"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <span className="material-symbols-outlined text-primary dark:text-dusk-primary">
                  {CATEGORY_ICONS[name] ?? "label"}
                </span>
                <h4 className="font-semibold text-on-surface dark:text-dusk-text mt-2">
                  {name}
                </h4>
                <p className="text-xs text-on-surface-variant dark:text-dusk-text-muted">
                  {count} tasks
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-on-surface dark:text-dusk-text">
          Active Tasks
        </h3>
        {activeTodos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            delay={0.1 * index}
          />
        ))}
      </section>

      {completedTodos.length > 0 && (
        <section className="space-y-2">
          <h4 className="text-xs font-semibold text-outline dark:text-dusk-text-muted tracking-widest uppercase">
            Finished Today
          </h4>
          {completedTodos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              delay={0.1 * index}
            />
          ))}
        </section>
      )}

      <Link
        to="/new"
        className="fixed bottom-24 right-6 w-16 h-16 rounded-full sunset-gradient text-white shadow-2xl flex items-center justify-center active:scale-90 duration-150 transition-transform z-50"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </Link>
    </div>
  );
};

export default HomePage;

import { useState, useEffect } from "react";
import { getTodos, updateTodo, deleteTodo } from "../services/todoService";
import TodoItem from "../components/TodoItem";

const formatGroupDate = (dueDate) => {
  return new Date(dueDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

const CalendarPage = () => {
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

  const withDate = todos
    .filter((t) => t.dueDate)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const withoutDate = todos.filter((t) => !t.dueDate);

  const groups = Object.entries(
    withDate.reduce((acc, t) => {
      acc[t.dueDate] = acc[t.dueDate] || [];
      acc[t.dueDate].push(t);
      return acc;
    }, {}),
  );

  return (
    <div className="space-y-8">
      <section className="fade-in">
        <p className="text-primary dark:text-dusk-primary text-xs font-semibold uppercase tracking-widest">
          Schedule
        </p>
        <h2 className="text-3xl font-bold text-on-background dark:text-dusk-text mt-1">
          Calendar
        </h2>
      </section>

      {groups.map(([dueDate, items], index) => (
        <section
          key={dueDate}
          className="fade-in space-y-3"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <h3 className="text-xs font-semibold text-outline dark:text-dusk-text-muted tracking-widest uppercase">
            {formatGroupDate(dueDate)}
          </h3>
          <div className="space-y-4">
            {items.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      ))}

      {withoutDate.length > 0 && (
        <section className="fade-in space-y-3">
          <h3 className="text-xs font-semibold text-outline dark:text-dusk-text-muted tracking-widest uppercase">
            No Date
          </h3>
          <div className="space-y-4">
            {withoutDate.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CalendarPage;

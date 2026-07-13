import { Link } from "react-router-dom";

const TAG_STYLES = {
  Urgent: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  External: "bg-primary-fixed text-on-primary-fixed-variant",
};

const formatDue = (todo) => {
  if (todo.dueTime) {
    const [hours, minutes] = todo.dueTime.split(":").map(Number);
    return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  if (todo.dueDate) {
    return new Date(todo.dueDate).toLocaleDateString("en-US", {
      weekday: "long",
    });
  }
  return null;
};

const formatDoneAt = (completedAt) => {
  if (!completedAt) return null;
  return new Date(completedAt).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const TodoItem = ({ todo, onToggle, onDelete, delay = 0 }) => {
  if (todo.completed) {
    return (
      <div
        className="fade-in flex items-center p-5 opacity-50 transition-all duration-300"
        style={{ animationDelay: `${delay}s` }}
      >
        <input
          type="checkbox"
          checked
          onChange={() => onToggle(todo)}
          className="circular-checkbox w-7 h-7 rounded-full border-2 border-primary appearance-none transition-all cursor-pointer"
        />
        <div className="ml-4 flex-grow">
          <h3 className="text-lg font-semibold text-on-surface dark:text-dusk-text line-through">
            {todo.text}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center text-xs font-semibold text-on-surface-variant dark:text-dusk-text-muted">
              <span className="material-symbols-outlined text-[14px] mr-1">
                check_circle
              </span>
              Done {formatDoneAt(todo.completedAt)}
            </span>
          </div>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-outline-variant dark:text-dusk-text-muted hover:text-secondary transition-colors"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    );
  }

  const due = formatDue(todo);

  return (
    <div
      className="fade-in hover-lift flex items-center p-5 bg-surface-container-lowest dark:bg-dusk-surface-bright rounded-lg border border-surface-container dark:border-dusk-surface transition-all duration-300"
      style={{ animationDelay: `${delay}s` }}
    >
      <input
        type="checkbox"
        checked={false}
        onChange={() => onToggle(todo)}
        className="circular-checkbox w-7 h-7 rounded-full border-2 border-primary-container appearance-none transition-all cursor-pointer flex-shrink-0"
      />
      <Link to={`/edit/${todo.id}`} className="ml-4 flex-grow min-w-0">
        <h3 className="text-lg font-semibold text-on-surface dark:text-dusk-text truncate">
          {todo.text}
        </h3>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          {due && (
            <span className="flex items-center text-xs font-semibold text-on-surface-variant dark:text-dusk-text-muted">
              <span className="material-symbols-outlined text-[14px] mr-1">
                schedule
              </span>
              {due}
            </span>
          )}
          {todo.tag && (
            <span
              className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-tighter ${TAG_STYLES[todo.tag] ?? "bg-surface-container-high text-on-surface-variant"}`}
            >
              {todo.tag}
            </span>
          )}
        </div>
      </Link>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-outline-variant dark:text-dusk-text-muted hover:text-secondary transition-colors ml-2"
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
};

export default TodoItem;

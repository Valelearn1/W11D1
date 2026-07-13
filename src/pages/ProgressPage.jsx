import { useState, useEffect } from "react";
import { getTodos } from "../services/todoService";

const CATEGORY_ICONS = {
  Work: "work",
  Personal: "favorite",
  Health: "fitness_center",
  Creative: "palette",
};

const ProgressPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };

    loadTodos();
  }, []);

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const byCategory = Object.entries(
    todos.reduce((acc, t) => {
      acc[t.category] = acc[t.category] || { total: 0, completed: 0 };
      acc[t.category].total += 1;
      if (t.completed) acc[t.category].completed += 1;
      return acc;
    }, {}),
  );

  return (
    <div className="space-y-8">
      <section className="fade-in">
        <p className="text-primary dark:text-dusk-primary text-xs font-semibold uppercase tracking-widest">
          Overview
        </p>
        <h2 className="text-3xl font-bold text-on-background dark:text-dusk-text mt-1">
          Progress
        </h2>
      </section>

      <section className="fade-in bg-surface-container-lowest dark:bg-dusk-surface-bright rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-on-surface dark:text-dusk-text">
              Overall Completion
            </h3>
            <p className="text-sm text-on-surface-variant dark:text-dusk-text-muted">
              {completed} of {total} tasks done
            </p>
          </div>
          <p className="text-2xl font-bold text-secondary dark:text-dusk-secondary">
            {completionRate}%
          </p>
        </div>
        <div className="w-full h-3 bg-surface-container-high dark:bg-dusk-surface rounded-full overflow-hidden">
          <div
            className="h-full sunset-gradient"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-on-surface dark:text-dusk-text">
          By Category
        </h3>
        {byCategory.map(([name, stats], index) => {
          const rate = Math.round((stats.completed / stats.total) * 100);
          return (
            <div
              key={name}
              className="fade-in bg-surface-container-lowest dark:bg-dusk-surface-bright rounded-lg p-4"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center gap-2 font-medium text-on-surface dark:text-dusk-text">
                  <span className="material-symbols-outlined text-primary dark:text-dusk-primary">
                    {CATEGORY_ICONS[name] ?? "label"}
                  </span>
                  {name}
                </span>
                <span className="text-xs text-on-surface-variant dark:text-dusk-text-muted">
                  {stats.completed}/{stats.total}
                </span>
              </div>
              <div className="w-full h-2 bg-surface-container-high dark:bg-dusk-surface rounded-full overflow-hidden">
                <div
                  className="h-full sunset-gradient"
                  style={{ width: `${rate}%` }}
                />
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ProgressPage;

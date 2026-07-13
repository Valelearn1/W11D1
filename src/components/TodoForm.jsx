import { useState, useEffect } from "react";

const CATEGORIES = [
  { name: "Personal", icon: "wb_sunny" },
  { name: "Work", icon: "work" },
  { name: "Health", icon: "fitness_center" },
  { name: "Creative", icon: "palette" },
];

const emptyInitial = {
  text: "",
  category: "Personal",
  dueDate: "",
  dueTime: "",
  highPriority: false,
};

const TodoForm = ({ initialValues = emptyInitial, onSubmit, submitLabel = "Create Task" }) => {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-surface-container-lowest dark:bg-dusk-surface-bright rounded-lg p-6 shadow-sm">
        <label
          htmlFor="task-input"
          className="block text-xs font-semibold text-outline-variant dark:text-dusk-text-muted mb-2 tracking-wide"
        >
          WHAT'S ON YOUR MIND?
        </label>
        <textarea
          id="task-input"
          rows="4"
          required
          value={values.text}
          onChange={handleChange("text")}
          placeholder="What needs to be done?"
          className="w-full bg-transparent border-none p-0 text-xl font-semibold placeholder:text-surface-container-highest dark:placeholder:text-dusk-text-muted resize-none focus:outline-none focus:ring-0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest dark:bg-dusk-surface-bright rounded-lg p-6 shadow-sm space-y-3">
          <h3 className="text-xs font-semibold text-outline-variant dark:text-dusk-text-muted tracking-wide">
            SELECT CATEGORY
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() =>
                  setValues((prev) => ({ ...prev, category: cat.name }))
                }
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  values.category === cat.name
                    ? "bg-primary-fixed text-on-primary-fixed-variant border-primary-fixed"
                    : "border-surface-container-high text-on-surface-variant dark:text-dusk-text-muted dark:border-dusk-surface hover:bg-surface-container dark:hover:bg-dusk-surface"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    {cat.icon}
                  </span>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-dusk-surface-bright rounded-lg p-6 shadow-sm space-y-3">
          <h3 className="text-xs font-semibold text-outline-variant dark:text-dusk-text-muted tracking-wide">
            SCHEDULE
          </h3>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-primary dark:text-dusk-primary text-xs font-semibold">
                <span className="material-symbols-outlined text-[20px]">
                  calendar_today
                </span>
                DATE
              </div>
              <input
                type="date"
                value={values.dueDate}
                onChange={handleChange("dueDate")}
                className="w-full bg-surface-container-low dark:bg-dusk-surface border-none rounded-full px-4 py-2 text-sm text-on-surface-variant dark:text-dusk-text"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-secondary dark:text-dusk-secondary text-xs font-semibold">
                <span className="material-symbols-outlined text-[20px]">
                  schedule
                </span>
                TIME
              </div>
              <input
                type="time"
                value={values.dueTime}
                onChange={handleChange("dueTime")}
                className="w-full bg-surface-container-low dark:bg-dusk-surface border-none rounded-full px-4 py-2 text-sm text-on-surface-variant dark:text-dusk-text"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest dark:bg-dusk-surface-bright rounded-lg p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary dark:text-dusk-secondary">
            <span className="material-symbols-outlined">priority_high</span>
          </div>
          <div>
            <p className="font-semibold text-on-surface dark:text-dusk-text">
              Mark as High Priority
            </p>
            <p className="text-xs text-outline-variant dark:text-dusk-text-muted">
              Highlight this task in your sunset view
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={values.highPriority}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                highPriority: e.target.checked,
              }))
            }
            className="sr-only peer"
          />
          <div className="w-14 h-8 bg-surface-container-high dark:bg-dusk-surface rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-dusk-primary" />
        </label>
      </div>

      <button
        type="submit"
        className="w-full sunset-gradient text-white font-semibold text-lg py-5 rounded-full transition-transform hover:scale-[1.02] active:scale-95 duration-200 flex items-center justify-center gap-3"
      >
        <span className="material-symbols-outlined">task_alt</span>
        {submitLabel}
      </button>
    </form>
  );
};

export default TodoForm;

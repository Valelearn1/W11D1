import { useOutletContext } from "react-router-dom";

const SettingsPage = () => {
  const { theme, toggleTheme } = useOutletContext();

  return (
    <div className="space-y-6">
      <section className="fade-in">
        <p className="text-primary dark:text-dusk-primary text-xs font-semibold uppercase tracking-widest">
          Preferences
        </p>
        <h2 className="text-3xl font-bold text-on-background dark:text-dusk-text mt-1">
          Settings
        </h2>
      </section>

      <section className="fade-in bg-surface-container-lowest dark:bg-dusk-surface-bright rounded-lg p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary dark:text-dusk-primary">
            <span className="material-symbols-outlined">
              {theme === "light" ? "dark_mode" : "light_mode"}
            </span>
          </div>
          <div>
            <p className="font-semibold text-on-surface dark:text-dusk-text">
              Dark Mode
            </p>
            <p className="text-xs text-outline-variant dark:text-dusk-text-muted">
              Switch between the Sunset and Dusk themes
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            className="sr-only peer"
          />
          <div className="w-14 h-8 bg-surface-container-high dark:bg-dusk-surface rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-dusk-primary" />
        </label>
      </section>
    </div>
  );
};

export default SettingsPage;

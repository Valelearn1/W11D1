import { useState, useEffect } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/calendar", label: "Calendar", icon: "calendar_today" },
  { to: "/progress", label: "Progress", icon: "query_stats" },
  { to: "/settings", label: "Settings", icon: "settings" },
];

const Layout = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-background text-on-background dark:bg-dusk-surface dark:text-dusk-text transition-colors">
      <header className="fixed top-0 w-full z-40 bg-background/90 dark:bg-dusk-surface/90 backdrop-blur-sm flex justify-between items-center px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary dark:text-dusk-primary">
            wb_twilight
          </span>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary dark:from-dusk-primary dark:to-dusk-secondary">
            Sunset ToDo
          </h1>
        </Link>
      </header>

      <main className="pt-24 pb-28 px-5 max-w-2xl mx-auto">
        <Outlet context={{ theme, toggleTheme }} />
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface-container-low dark:bg-dusk-surface-bright rounded-t-lg">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center rounded-full px-4 py-1 transition-colors ${
                isActive
                  ? "bg-primary-container text-on-primary-container dark:bg-dusk-primary dark:text-dusk-surface"
                  : "text-on-surface-variant dark:text-dusk-text-muted"
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;

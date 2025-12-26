import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  // Check localStorage for saved theme, default to "dark"
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("spotify-theme");
    return savedTheme || "dark";
  });

  // Toggle between dark and light theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("spotify-theme", theme);
  }, [theme]);

  const ContextValue = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={ContextValue}>
      {props. children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
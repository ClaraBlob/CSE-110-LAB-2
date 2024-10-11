import { useState } from "react";
import { ThemeContext, themes } from "./ThemeContext";

export function ToggleTheme() {
 const [currentTheme, setCurrentTheme] = useState(themes.light);

 const toggleTheme = () => {
   setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
 };

 return (
   <ThemeContext.Provider value={currentTheme}>
     <button onClick={toggleTheme}> Toggle Theme </button>
   </ThemeContext.Provider>
 );
}
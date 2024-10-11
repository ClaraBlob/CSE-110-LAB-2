import { useState } from "react";
import App from "./App";
import { ThemeContext, themes } from "./ThemeContext";

export function ToggleTheme(props:any) {
 const [currentTheme, setCurrentTheme] = useState(props.newTheme);

 const toggleTheme = () => {
   setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);

 };

 return (
   <ThemeContext.Provider value={currentTheme}>
     <button onClick={toggleTheme}> Toggle Theme </button>

   </ThemeContext.Provider>
 );
}

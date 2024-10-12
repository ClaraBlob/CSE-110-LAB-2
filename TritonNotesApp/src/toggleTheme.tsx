import { useState } from "react";
import App from "./App";
import { ThemeContext, themes } from "./ThemeContext";
//tried using props
export function ToggleTheme(props:any) {
   const [currentTheme, setCurrentTheme] = useState(themes.light);

 const toggleTheme = () => {
   setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
 };
 return (
  <ThemeContext.Provider value={currentTheme}>
    <button onClick={props.toggleTheme}> Toggle Theme </button>
  </ThemeContext.Provider>
 );
}

import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    //context can have both value and function 
    themeMode : "light",
    darkMode: ()=>{}, // these are defined in App.jsx
    lightMode: ()=>{},
}); // context default value

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
    return useContext(ThemeContext);
}
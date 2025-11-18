"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
    mode : "light",
    toggleMode : ()=> {}
})

export const useThemeMode = ()=> useContext(ThemeContext);

export default function ThemeProvider({ children} : { children : React.ReactNode}) {
    const [ mode, setMode ] = useState<"light" | "dark">("light");
    
    useEffect(()=> {
        const saved = localStorage.getItem("themeMode");
        if (saved === "dark" || saved === "light") {
            setMode(saved);
        }
    },[])
}
import React, { useState } from "react"
import { ThemeContext, type Theme } from "../context/ThemeContext"

type Props = {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: Props) => {
    const [theme, setTheme] = useState<Theme>("dark")

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

import React, { useEffect, useState } from "react"
import { ThemeContext, type Theme } from "../context/ThemeContext"

type Props = {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: Props) => {
    const [theme, setTheme] = useState<Theme>("dark")

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }

    useEffect(() => {
        const root = document.documentElement
        if (theme == "dark") {
            root.classList.remove("light")
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
            root.classList.add("light")
        }
    }, [theme])

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

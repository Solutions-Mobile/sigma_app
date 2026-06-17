import { useEffect, useMemo, useState, } from "react";
import { ThemeContext, type Theme } from "./theme-context";

type Props = {
    children: React.ReactNode;
};

const STORAGE_KEY = "app-theme";

function getInitialTheme(): Theme {
    const storedTheme =
        localStorage.getItem(
            STORAGE_KEY
        ) as Theme | null;

    if (
        storedTheme === "light" ||
        storedTheme === "dark"
    ) {
        return storedTheme;
    }

    return "light";
}

export function ThemeProvider({
    children,
}: Props) {
    const [theme, setTheme] =
        useState<Theme>(getInitialTheme);

    useEffect(() => {
        const root =
            window.document.documentElement;

        root.classList.remove(
            "light",
            "dark"
        );

        root.classList.add(theme);

        localStorage.setItem(
            STORAGE_KEY,
            theme
        );
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme]
    );

    return (
        <ThemeContext.Provider
            value={value}
        >
            {children}
        </ThemeContext.Provider>
    );
}

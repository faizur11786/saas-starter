"use client";

import canUseDOM from "@/lib/canUseDOM";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export type Theme = "dark" | "light";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <HeaderThemeProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </HeaderThemeProvider>
  );
}

export interface ContextType {
  headerTheme?: Theme | null;
  setHeaderTheme: (theme: Theme | null) => void;
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
};

const HeaderThemeContext = createContext(initialContext);

export const HeaderThemeProvider = ({ children }: { children: ReactNode }) => {
  const [headerTheme, setThemeState] = useState<Theme | undefined | null>(
    canUseDOM
      ? (document.documentElement.getAttribute("data-theme") as Theme)
      : undefined
  );

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet);
  }, []);

  return (
    <HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  );
};

export const useHeaderTheme = (): ContextType => useContext(HeaderThemeContext);

"use client";

import { ReactNode, useEffect, useState } from "react";
import { atomWithStorage } from "jotai/utils";
import { useAtomValue } from "jotai";

type Props = {
  children: ReactNode;
};

export const LIGHT = "light";
export const DARK = "dark";
export const SYSTEM = "system";
export type Theme = typeof LIGHT | typeof DARK | typeof SYSTEM;

export const themeAtom = atomWithStorage<Theme>("theme", SYSTEM);

const ThemeProvider = ({ children }: Props) => {
  const theme = useAtomValue(themeAtom);
  const [darkQuery, setDarkQuery] = useState<MediaQueryList | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDarkQuery(window.matchMedia("(prefers-color-scheme: dark)"));
  }, []);

  const addDarkClass = () => {
    const html = document.documentElement;
    const body = document.body;

    html.style.setProperty("color-scheme", DARK);
    body.classList.add(DARK);
  };

  const removeDarkClass = () => {
    const html = document.documentElement;
    const body = document.body;

    html.style.setProperty("color-scheme", LIGHT);
    body.classList.remove(DARK);
  };

  useEffect(() => {
    if (!mounted || !darkQuery) return;

    const themeActions = {
      system: () => (darkQuery.matches ? addDarkClass() : removeDarkClass()),
      dark: () => addDarkClass(),
      light: () => removeDarkClass(),
    };

    themeActions[theme] && themeActions[theme]();
  }, [theme, mounted, darkQuery]);

  useEffect(() => {
    if (theme !== SYSTEM || !darkQuery) return;

    const handleChange = () =>
      darkQuery.matches ? addDarkClass() : removeDarkClass();

    darkQuery.addEventListener("change", handleChange);
    return () => darkQuery.removeEventListener("change", handleChange);
  }, [theme, darkQuery]);

  return <>{!mounted ? null : children}</>;
};

export default ThemeProvider;

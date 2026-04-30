import { useState, useEffect } from "react";

const STORAGE_KEY = "request-system:locale";

function detectLocale() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "uk" || saved === "en") return saved;

  const lang = navigator.language || "";
  return lang.startsWith("uk") ? "uk" : "en";
}

export function useLocale() {
  const [locale, setLocale] = useState(detectLocale);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const toggle = () => setLocale((l) => (l === "uk" ? "en" : "uk"));

  return { locale, toggle };
}

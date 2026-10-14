"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-4 right-4 rounded-full bg-[var(--glass)] border border-[var(--glass-border)] p-2 hover:bg-white/[.1] transition-colors"
      aria-label="Toggle dark/light theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-[var(--primary)]" />
      ) : (
        <Moon className="w-5 h-5 text-[var(--primary)]" />
      )}
    </button>
  )
}
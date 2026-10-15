"use client"

import React from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => setMounted(true), [])
  const isDark = mounted ? resolvedTheme === "dark" : true

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-4 right-4 z-[100] border-2 border-[var(--line)] bg-[var(--bg-elevated)] p-3 shadow-[var(--shadow)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
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
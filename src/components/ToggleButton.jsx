// src/components/ToggleButton.jsx

import { useTheme } from "next-themes"

export default function ToggleButton() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="ml-3 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded"
    >
      {theme === "light" ? "🌙 다크모드" : "☀️ 라이트모드"}
    </button>
  )
}

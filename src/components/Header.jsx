import { Link } from "react-router-dom";
import ToggleButton from "./ToggleButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
      {/* 로고 클릭 시 / 경로로 이동 */}
      <Link to="/" className="flex items-center gap-2 font-bold text-lg text-gray-800 dark:text-white">
        <img src="/vite.svg" alt="ScalpCare Logo" className="w-6 h-6" />
        ScalpCare
      </Link>

      <ToggleButton />
    </header>
  );
}

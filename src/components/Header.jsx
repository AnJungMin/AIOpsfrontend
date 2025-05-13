import { Link } from "react-router-dom";
import ToggleButton from "./ToggleButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-white">
        <img src="/vite.svg" alt="Logo" className="w-6 h-6" />
        AI 두피케어
      </Link>

      <nav className="flex gap-6 text-sm text-gray-700 dark:text-gray-200">
        <Link to="/diagnosis" className="hover:text-blue-600">진단하기</Link>
        <Link to="/products" className="hover:text-blue-600">제품추천</Link>
        <Link to="/community" className="hover:text-blue-600">커뮤니티</Link>
        <Link to="/login" className="hover:text-blue-600">로그인</Link>
      </nav>

      <ToggleButton />
    </header>
  );
}

import ToggleButton from "./ToggleButton";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <h1 className="text-xl font-bold flex items-center gap-2">
        🧠 <span>ScalpCare</span>
      </h1>
      <ToggleButton />
    </header>
  );
}
